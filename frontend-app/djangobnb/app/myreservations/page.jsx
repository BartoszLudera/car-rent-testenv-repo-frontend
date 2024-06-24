import Image from "next/image";
import Link from "next/link";

export default function MyReservationsPage(){

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 pt-28">
            <h1 className="my-6 text-2xl">My reservations</h1>

            <div className="space-y-4">
                {/* {reservations.map((reservation: any) => {
                    return (               */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <Image
                                        fill
                                        src="/beach_1.jpg"
                                        className="hover:scale-110 object-cover transition h-full w-full"
                                        alt="Beach house"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-3">
                                <h2 className="mb-4 text-xl">property title</h2>

                                <p className="mb-2"><strong>Check in date:</strong> start date</p>
                                <p className="mb-2"><strong>Check out date:</strong> end date</p>

                                <p className="mb-2"><strong>Number of nights:</strong> number of nights</p>
                                <p className="mb-2"><strong>Total price:</strong> $ total price</p>

                                <Link 
                                    href={`/properties/sda`}
                                    className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
                                >
                                    Go to property
                                </Link>
                            </div>
                        </div>
                        
                    {/* )
                })} */}
            </div>
        </main>
    )
}
