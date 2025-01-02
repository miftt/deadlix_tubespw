import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links: PaginationLink[];
}

export default function Pagination({ links }: Props) {
    if (links.length < 3) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            {links.map((link, key) => {
                if (link.url === null) return null;

                // Remove HTML entities from label
                const label = link.label.replace(/&laquo;|&raquo;/g, '');

                if (key === 0) {
                    return (
                        <Button
                            key={key}
                            variant={link.active ? "default" : "outline"}
                            asChild
                            size="icon"
                        >
                            <Link href={link.url}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                    );
                }

                if (key === links.length - 1) {
                    return (
                        <Button
                            key={key}
                            variant={link.active ? "default" : "outline"}
                            asChild
                            size="icon"
                        >
                            <Link href={link.url}>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    );
                }

                return (
                    <Button
                        key={key}
                        variant={link.active ? "default" : "outline"}
                        asChild
                    >
                        <Link href={link.url}>{label}</Link>
                    </Button>
                );
            })}
        </div>
    );
} 