export default function ReverseCustomButton({ label, className, onClick }){
    return (
        <div
            onClick={onClick}
            className={`w-full py-4 bg-transparent hover:bg-airbnb hover:text-white border-2 border-aribnb text-airbnb text-center rounded-xl transition cursor-pointer ${className}`}
        >
            {label}
        </div>
    );
}