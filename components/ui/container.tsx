interface ContainerProps {
    children: React.ReactNode;
    wide?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, wide = false }) => {
    return (
        <div className={`mx-auto ${wide ? 'max-w-full px-4 sm:px-6 lg:px-8' : 'max-w-7xl'}`}>
            {children}
        </div>
    );
};

export default Container