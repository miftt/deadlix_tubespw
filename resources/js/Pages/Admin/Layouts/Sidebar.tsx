import { Home, Users, Film, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';

// Tambahkan type untuk PageProps
interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
}

const menuItems = [
    { icon: Home, label: 'Dashboard', href: route('admin.dashboard') },
    { icon: Users, label: 'Users', href: route('admin.users') },
    { icon: Film, label: 'Movies', href: route('admin.movies') },
    { icon: Settings, label: 'Settings', href: route('admin.settings') },
];

export function Sidebar() {
    const { url, props } = usePage<PageProps>();
    const { user } = props.auth;

    return (
        <>
            <Toaster position="top-center" richColors />
            <div className="flex h-screen w-72 flex-col bg-gradient-to-b from-gray-900 to-black border-r border-gray-800">
                <div className="flex h-16 items-center px-6 border-b border-gray-800">
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                        Deadflix Admin
                    </span>
                </div>
                <nav className="flex-1 space-y-1 px-3 py-6">
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start gap-3 text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all duration-200 rounded-lg py-6',
                                    url === item.href && 'bg-gray-800/70 text-white shadow-lg shadow-gray-900/20'
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </nav>
                
                {/* User Profile Section */}
                <div className="border-t border-gray-800">
                    <div className="p-4">
                        <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-gray-800/30">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">{user.name}</span>
                                <span className="text-xs text-gray-400">{user.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 pb-4">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-4 text-gray-400 
                            hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Logout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}