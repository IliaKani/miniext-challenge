import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
    return <div className="flex flex-col h-screen mx-auto">{children}</div>;
}
