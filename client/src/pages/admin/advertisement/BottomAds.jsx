import { useEffect } from "react";
import AdvertisementTable from "../../../components/admin/AdvertisementTable";
import useFetchBottomAds from "../../../hooks/useFetchBottomAds";
import Spinner from "../../../components/Loading/Spinner";

const BottomAds = () => {
  const [bottomAds, refetch, loading] = useFetchBottomAds();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <AdvertisementTable
          title={"Bottom Advertisement"}
          advertisments={bottomAds}
          updateRoute="update-bottom-ad"
          deleteAPI="bottom-ads"
          refetch={refetch}
        />
      )}
    </>
  );
};

export default BottomAds;
