import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { useEffect } from "react";

const categories = [
	{ href: "/GPU", name: "GPU", imageUrl: "/GPU.jpg", description: "Powerful graphics cards for gaming and rendering." },
	{ href: "/CPU", name: "CPU", imageUrl: "/CPU.jpg", description: "High-performance processors for all tasks." },
	{ href: "/SSD", name: "SSD", imageUrl: "/SSD.jpg", description: "Fast and reliable solid-state drives." },
	{ href: "/Hard drives", name: "Hard drives", imageUrl: "/Hard drives.jpg", description: "Storage solutions for all your data." },
	{ href: "/RAM", name: "RAM", imageUrl: "/RAM.jpg", description: "Fast and efficient memory modules." },
	{ href: "/Motherboards", name: "Motherboards", imageUrl: "/Motherboards.jpg", description: "The backbone of your PC build." },
	{ href: "/Power supply", name: "Power supply", imageUrl: "/Power supply.jpg", description: "Reliable power for your components." },
	{ href: "/Coolers", name: "Coolers", imageUrl: "/Coolers.jpg", description: "Efficient cooling for optimal performance." },
	{ href: "/Monitors", name: "Monitors", imageUrl: "/Monitors.jpg", description: "Crisp displays for work and play." },
	{ href: "/Mouses", name: "Mouses", imageUrl: "/Mouses.png", description: "Precision and comfort in every click." },
	{ href: "/Headphones", name: "Headphones", imageUrl: "/Headphones.jpg", description: "Immersive sound for your ears." },
	{ href: "/Keyboards", name: "Keyboards", imageUrl: "/Keyboards.jpg", description: "Responsive and ergonomic keyboards." },
	{ href: "/Microphones", name: "Microphones", imageUrl: "/Microphones.jpg", description: "Clear audio capture for your needs." },
	{ href: "/Pads", name: "Pads", imageUrl: "/Pads.jpg", description: "High-quality pads for smooth performance." },
	{ href: "/Webcams", name: "Webcams", imageUrl: "/Webcams.jpg", description: "Crystal-clear video for calls and streaming." },
  ];
  

const HomePage = () => {

	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-cyan-400 mb-4'>
					Build your dream PC with us
				</h1>
				<p className='text-center text-xl text-cyan-200 mb-12'>
					Best components and gaming devices for your needs
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};

export default HomePage;