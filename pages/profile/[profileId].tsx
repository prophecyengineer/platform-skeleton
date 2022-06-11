import { useRouter } from "next/router";

const PublicProfile = (props) => {
  const router = useRouter();
  const { profileId } = router.query;

  return <p>PublicProfile: {profileId}</p>;
};

export default PublicProfile;
