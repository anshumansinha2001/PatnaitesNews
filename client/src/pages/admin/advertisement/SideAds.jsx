import React, { useEffect } from "react";
import AdvertisementTable from "../../../components/admin/AdvertisementTable";
import useFetchSideAds from "../../../hooks/useFetchSideAds";
import Spinner from "../../../components/Loading/Spinner";

const SideAds = () => {
  const [sideAds, refetch, loading] = useFetchSideAds();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <AdvertisementTable
          title={"Side Advertisement"}
          advertisments={sideAds}
          updateRoute="update-side-ad"
          deleteAPI="side-ads"
          refetch={refetch}
        />
      )}
    </>
  );
};

export default SideAds;
