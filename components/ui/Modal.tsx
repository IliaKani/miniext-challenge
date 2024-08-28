interface Props {
    children: React.ReactNode;
    show: boolean;
    setShow: (arg: boolean) => void;
}

export default function Modal({ children, show, setShow }: Props) {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen z-20 flex items-center justify-center ${
                show ? 'block' : 'hidden'
            }`}
        >
            {children}
            {/* overlay */}
            <div
                className={`fixed bg-black/50 -z-10 top-0 left-0 w-full h-screen ${
                    show ? 'block' : 'hidden'
                }`}
                onClick={() => setShow(false)}
            >
                .
            </div>
        </div>
    );
}
