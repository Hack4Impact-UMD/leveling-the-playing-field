export default function NavBar() {
    return (
        <div className=" bg-teal p-32 pt-8 pb-8 flex justify-between items-center text-white rounded-b-custom">
            <div className='flex flex-col items-center hover:bg-teal-light p-4 rounded-mini'>
                <img src="/_images/profile.svg" className='w-12 h-12 filter invert'alt="Profile"  />
                <h1 className=" hover:text-white-dark">Profile</h1>
            </div>
            
            <div className='flex flex-col items-center hover:bg-teal-light rounded-mini p-4'>
                <h1 className="hover:text-white-dark">Search</h1>
            </div>

            <div className="flex flex-col items-center hover:bg-teal-light rounded-mini p-4">
                <h1 className="hover:text-white-dark">Appointments</h1>
            </div>
            
            <div className="flex flex-col items-center hover:bg-teal-light rounded-mini p-4">
                <img src="/_images/shopping-cart.svg" className='w-12 h-12 filter invert' alt="Shopping Cart" />
                <h1 className="hover:text-white-dark">Orders</h1>
            </div>
        </div>
    );
}
