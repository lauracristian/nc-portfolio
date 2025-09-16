import UserBooking from "./UserBooking";
import UserProfile from "./UserProfile";
import UserReviews from "./UserReviews";

export default function UserDash() {
  return (
    <div>
      <UserProfile />
      <UserBooking />
      <UserReviews />
    </div>
  );
}
