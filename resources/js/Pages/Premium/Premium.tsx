import { Head, router, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { useState } from "react";
import axios from "axios";
import { Check, Star, Crown, Download, Tv, Film, Subtitles, Clock, Shield } from "lucide-react";

interface PlanType {
    id: number;
    name: string;
    price: number;
    duration: string;
    features: string[];
    popular?: boolean;
}

// Definisikan mapping untuk feature icons
const featureIcons = {
    "Unlimited Watchlist": <Film className="w-4 h-4" />,
    "Ad-free Experience": <Shield className="w-4 h-4" />,
    "HD Quality": <Tv className="w-4 h-4" />,
    "Download Movies": <Download className="w-4 h-4" />,
    "Multiple Language Subtitles": <Subtitles className="w-4 h-4" />,
    "Early Access": <Clock className="w-4 h-4" />,
    "FHD Quality": <Tv className="w-4 h-4" />,
    "Behind the Scenes": <Film className="w-4 h-4" />,
    "All Monthly Features": <Check className="w-4 h-4" />,
    "Save 17%": <Star className="w-4 h-4" />
};

const getIconForPlan = (planName: string) => {
    if (planName.includes('Monthly')) {
        return <Crown className="w-6 h-6 text-amber-400" />;
    }
    return <Star className="w-6 h-6 text-amber-400" />;
};

export default function PremiumPlans({ products }: { products: PlanType[] }) {
    const auth = usePage().props.auth;
    console.log(products);
    
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (plan: PlanType) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/checkout', {
                product_id: plan.id,
                price: plan.price
            });
            
            if (response.data.id) {
                console.log(response);
                router.visit(`/checkout/${response.data.id}`);
            } else {
                console.error('No checkout ID received from server');
            }
        } catch (error: any) {
            console.error('Error processing payment:', error);
            if (error.response?.status === 401) {
                router.visit('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
            <>  
                <Head title="Premium Plans" />  
                <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 mt-16">  
                    <Navbar user={auth.user} />  
        
                    <div className="container mx-auto px-4 py-16">  
                        <div className="text-center mb-16">  
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">  
                                Upgrade Your Experience  
                            </h1>  
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">  
                                Choose the perfect plan and unlock a world of unlimited entertainment  
                            </p>  
                        </div>  
        
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">  
                            {products.map((plan) => (  
                                <div  
                                    key={plan.id}  
                                    className={`relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 flex flex-col justify-between ${  
                                        plan.popular  
                                            ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border-2 border-amber-500/50'  
                                            : 'bg-gray-800'  
                                    }`}  
                                >  
                                    {plan.popular && (  
                                        <div className="absolute top-4 right-4">  
                                            <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">  
                                                MOST POPULAR  
                                            </span>  
                                        </div>  
                                    )}  
        
                                    <div className="p-8">  
                                        <div className="flex items-center gap-3 mb-6">  
                                            {getIconForPlan(plan.name)}  
                                            <h2 className="text-2xl font-bold text-white">  
                                                {plan.name}  
                                            </h2>  
                                        </div>  
        
                                        <div className="flex items-baseline mb-8">  
                                            <span className="text-4xl font-bold text-white">  
                                                Rp {plan.price.toLocaleString()}  
                                            </span>  
                                            <span className="ml-2 text-gray-400">  
                                                {plan.duration}  
                                            </span>  
                                        </div>  
        
                                        <ul className="space-y-4 mb-8">  
                                            {plan.features.map((feature, index) => (  
                                                <li  
                                                    key={index}  
                                                    className="flex items-center gap-3 text-gray-300"  
                                                >  
                                                    <span className="flex-shrink-0 p-1 rounded-full bg-green-500/10 text-green-400">  
                                                        <Check className="w-4 h-4" />  
                                                    </span>  
                                                    <span className="flex items-center gap-2">  
                                                        {featureIcons[feature as keyof typeof featureIcons] && (  
                                                            <span className="text-gray-400">  
                                                                {featureIcons[feature as keyof typeof featureIcons]}  
                                                            </span>  
                                                        )}  
                                                        {feature}  
                                                    </span>  
                                                </li>  
                                            ))}  
                                        </ul>  
                                    </div>  
        
                                    <button  
                                        onClick={() => handleSubscribe(plan)}  
                                        disabled={loading}  
                                        className={`  
                                            w-full py-4 rounded-xl font-semibold transition-all duration-300  
                                            ${plan.popular  
                                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black'  
                                                : 'bg-white hover:bg-gray-100 text-gray-900'  
                                            }  
                                            disabled:opacity-50 disabled:cursor-not-allowed  
                                        `}  
                                    >  
                                        {loading ? 'Processing...' : 'Get Started'}  
                                    </button>  
                                </div>  
                            ))}  
                        </div>  
        
                        <div className="mt-16 text-center text-gray-400">  
                            <p className="text-sm">  
                                All plans include our 30-day money-back guarantee  
                            </p>  
                        </div>  
                    </div>  
                </div>  
            </>  
        );
}