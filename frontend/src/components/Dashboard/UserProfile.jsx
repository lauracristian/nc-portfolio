export default function UserProfile() {
  return (
    <div>
      <h2>My Profile Details</h2>
      <form>
        <label htmlFor="username"> Username</label>
        <input id="username" />
        <br />
        <label htmlFor="password"> Password</label>
        <input id="password" />
        <br />
        <br />
        <label htmlFor="email"> Email</label>
        <input id="email" />
        <br />
        <label htmlFor="phone"> Phone</label>
        <input id="phone" />
        <br />
        <button>Edit</button>
      </form>
    </div>
  );
}
