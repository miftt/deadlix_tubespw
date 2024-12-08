import { Home, Users, Film, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';

const menuItems = [
    { icon: Home, label: 'Dashboard', href: route('admin.dashboard') },
    { icon: Users, label: 'Users', href: route('admin.users') },
    { icon: Film, label: 'Movies', href: route('admin.movies') },
    { icon: Settings, label: 'Settings', href: route('admin.settings') },
];

export function Sidebar() {
    const { url } = usePage();

    return (
        <div className="flex h-screen w-64 flex-col bg-black">
            <div className="flex h-16 items-center px-6">
                <span className="text-2xl font-bold text-red-600">Admin</span>
            </div>
            <nav className="flex-1 space-y-2 px-4 py-4">
                {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant="ghost"
                            className={cn(
                                'w-full justify-start gap-2 text-gray-400 hover:bg-gray-900 hover:text-white',
                                url === item.href && 'bg-gray-900 text-white'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </nav>
            <div className="p-4">
                <Link href={route('logout')} method="post" as="button" className="w-full">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:bg-gray-900 hover:text-white">
                        <LogOut className="h-5 w-5" />
                        Logout
                    </Button>
                </Link>
            </div>
        </div>
    );
}