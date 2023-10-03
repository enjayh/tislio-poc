import AuthNav from '../AuthNav'

export default function Verify() {
  return (
    <>
      <AuthNav />
      <main>
        <h2 className="text-center">Thanks for registering!</h2>
        <p>Before logging in, you need to verify your email address.</p>
      </main>
    </>
  )
}