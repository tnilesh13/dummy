import React from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { toggleMenu } from '../redux/slice/DashboardSlice';
import { FaRegUser } from 'react-icons/fa';
import { getCurrentUserDetailsFromLocalStorage } from '../utils/storageUtility';

const Header = ({
  MenuIconVisiblity = true
}) => {
  const { isMenuOpen } = useSelector(state => state.DashboardReducer);
  const dispatch = useDispatch();
  const currentUserDetails = getCurrentUserDetailsFromLocalStorage();
  //  localStorage.getItem("ITG_CurrentUserDetails") ? JSON.parse(localStorage.getItem("ITG_CurrentUserDetails")) : {};

  const handleMenuClick = () => {
    // dispatch(toggleMenu(!isMenuOpen));
  };

  const Menuimage = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_2041)"><path d="M7.67891 8.43818H18.3932C18.4914 8.43818 18.5718 8.35782 18.5718 8.25961V7.00961C18.5718 6.91139 18.4914 6.83104 18.3932 6.83104H7.67891C7.5807 6.83104 7.50034 6.91139 7.50034 7.00961V8.25961C7.50034 8.35782 7.5807 8.43818 7.67891 8.43818ZM7.50034 12.9918C7.50034 13.09 7.5807 13.1703 7.67891 13.1703H18.3932C18.4914 13.1703 18.5718 13.09 18.5718 12.9918V11.7418C18.5718 11.6435 18.4914 11.5632 18.3932 11.5632H7.67891C7.5807 11.5632 7.50034 11.6435 7.50034 11.7418V12.9918ZM18.7503 2.14354H1.25034C1.15212 2.14354 1.07177 2.22389 1.07177 2.32211V3.57211C1.07177 3.67032 1.15212 3.75068 1.25034 3.75068H18.7503C18.8486 3.75068 18.9289 3.67032 18.9289 3.57211V2.32211C18.9289 2.22389 18.8486 2.14354 18.7503 2.14354ZM18.7503 16.2507H1.25034C1.15212 16.2507 1.07177 16.331 1.07177 16.4293V17.6793C1.07177 17.7775 1.15212 17.8578 1.25034 17.8578H18.7503C18.8486 17.8578 18.9289 17.7775 18.9289 17.6793V16.4293C18.9289 16.331 18.8486 16.2507 18.7503 16.2507ZM1.14766 10.1547L4.6365 12.9025C4.76596 13.0051 4.95793 12.9136 4.95793 12.7484V7.25291C4.95793 7.08773 4.7682 6.99621 4.6365 7.09889L1.14766 9.84666C1.1242 9.8649 1.10522 9.88826 1.09216 9.91495C1.0791 9.94164 1.07231 9.97096 1.07231 10.0007C1.07231 10.0304 1.0791 10.0597 1.09216 10.0864C1.10522 10.1131 1.1242 10.1365 1.14766 10.1547V10.1547Z" fill="#4A4A4A" /></g><defs><clipPath id="clip0_1_2041"><rect width="20" height="20" fill="white" /></clipPath></defs></svg>';
  const NotificationImage = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 8C0 3.58172 3.58172 0 8 0H24C28.4183 0 32 3.58172 32 8V24C32 28.4183 28.4183 32 24 32H8C3.58172 32 0 28.4183 0 24V8Z" fill="#303030"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.252 20.4239L10.806 20.1427C8.95137 19.9295 8.42536 17.4844 10.0283 16.5274L10.0932 16.4886C10.9659 15.9676 11.5004 15.0261 11.5004 14.0097V13.5C11.5004 11.0147 13.5151 9 16.0004 9C18.4857 9 20.5004 11.0147 20.5004 13.5V14.0097C20.5004 15.0261 21.0348 15.9676 21.9075 16.4886L21.9725 16.5274C23.5754 17.4844 23.0494 19.9295 21.1947 20.1427L18.652 20.435V20.8C18.652 22.2912 17.4431 23.5 15.952 23.5C14.4608 23.5 13.252 22.2912 13.252 20.8V20.4239ZM17.152 20.5H14.752V20.8C14.752 21.4627 15.2892 22 15.952 22C16.6147 22 17.152 21.4627 17.152 20.8V20.5ZM14.0004 19H18.0004L21.0235 18.6525C21.4529 18.6032 21.5747 18.0369 21.2036 17.8153L21.1386 17.7766C21.0591 17.7291 20.9814 17.6793 20.9056 17.6273C20.7506 17.521 20.6035 17.4055 20.465 17.2818C20.4404 17.2598 20.4162 17.2377 20.3921 17.2152C19.5143 16.395 19.0004 15.2383 19.0004 14.0097V13.5C19.0004 11.8431 17.6572 10.5 16.0004 10.5C14.3435 10.5 13.0004 11.8431 13.0004 13.5V14.0097C13.0004 15.2383 12.4864 16.395 11.6086 17.2152C11.5846 17.2377 11.5603 17.2598 11.5358 17.2818C11.3973 17.4055 11.2502 17.521 11.0952 17.6273C11.0194 17.6793 10.9417 17.7291 10.8622 17.7766L10.7972 17.8153C10.426 18.0369 10.5478 18.6032 10.9773 18.6525L14.0004 19Z" fill="#E3E3E3"/></svg>';

  return (
    <div className="flex items-center justify-between px-5 py-2 bg-white border-b border-gray-200 h-[55px]">
      {/* Menu Icon */}
      <button onClick={() => handleMenuClick()} className="text-white text-2xl cursor-pointer mb-0">
        {MenuIconVisiblity && <img src={`data:image/svg+xml;utf8,${encodeURIComponent(Menuimage)}`} />}
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Icon with Badge */}
        {/* <div className="relative flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full">
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(NotificationImage)}`} />
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
            2
          </span>
        </div> */}

        {/* Profile Section */}
        <div className="flex items-center gap-2">
          {
            currentUserDetails?.profileImage ? (
              <img src={currentUserDetails.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <FaRegUser className="text-gray-600 w-8 h-8 p-1" />
            )
          }
          <span className="text-sm font-medium text-gray-800">{currentUserDetails?.firstName}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
