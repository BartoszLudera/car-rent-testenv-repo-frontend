export default function CustomButton({ label, className, onClick }){
    return (
        <div
            onClick={onClick}
            className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </div>
    );
}