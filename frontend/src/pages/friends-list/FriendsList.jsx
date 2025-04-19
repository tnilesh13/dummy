import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendList } from '../../redux/thunk/UserThunk';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserDetailsFromLocalStorage } from '../../utils/storageUtility';

const FriendsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { friends, currentPageFriends, friendsStatus, totalFriends } = useSelector((state) => state.UserReducer);

  const currentUserDetails = getCurrentUserDetailsFromLocalStorage();

  useEffect(() => {
    dispatch(getFriendList({ page: currentPageFriends, search: "" }));
    // }, [dispatch, page, searchQuery]);
  }, [dispatch, currentPageFriends,]);

  console.log("----currentUserDetails", currentUserDetails);
  const handleChatRoute = (friendId) => {
    const userId = currentUserDetails._id;
    console.log("--clicked");
    
    navigate(`/dashboard/chat/${userId}/${friendId}`)
  };

  return (
    <div>
      {friendsStatus === "loading" ? (
        <div className='flex justify-center items-center h-screen'>
          <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24"></svg>
        </div>
      ) : (
        <div className='flex flex-col space-y-3 p-4'>
          {
            friends && friends.length > 0 ? (
              friends.map((friend, index) => (
                <div key={index} className='flex items-center justify-between p-4 bg-white shadow-md rounded-lg '
                  onClick={() => handleChatRoute(friend._id)}>
                  <div className='flex items-center space-x-3'>
                    <img src={friend.profileImage} alt={friend.name} className='w-10 h-10 rounded-full' />
                    <span className='text-lg font-semibold'>{friend.name}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center text-gray-500'>No friends found</div>
            )
          }
        </div>
      )

      }
    </div>
  )
}

export default FriendsList
