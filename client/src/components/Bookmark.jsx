import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { removeBookmark } from '../redux/bookmarkSlice'; 
import { FaTrashAlt } from 'react-icons/fa'; 

const Bookmark = () => {
  const bookmarkedProducts = useSelector((state) => state.bookmark.bookmarks);
  const dispatch = useDispatch();


  const handleBackClick = () => {
    window.location.href='/allproducts'
  };

  const handleRemoveBookmark = (id) => {
    dispatch(removeBookmark(id)); // Dispatch removeBookmark action to remove item from Redux store
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div style={{ padding: '10px 20px' }}>
          <button
            onClick={handleBackClick}  
            style={{
              padding: '6px 12px',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            ← Back
          </button>
          <h2 className="text-center text-2xl font-semibold py-6">Your Bookmarked Products</h2>
          {bookmarkedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
              {bookmarkedProducts.map((item) => (
                <div key={item.id} className="p-4 rounded-md shadow-sm bg-white relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-48 w-full object-contain mb-3"
                  />
                  <div className="flex justify-between items-start">
                    <div className="text-left">
                      <h2 className="text-md font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">Rating: {item.rating}</p>
                      <p className="text-md font-bold">{item.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(item.id)}
                      className="absolute top-2 right-2 text-red-600"
                    >
                      <FaTrashAlt className="cursor-pointer text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-6">You have no bookmarked products.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bookmark;
