import React, { useEffect } from "react";
import AdvertisementTable from "../../../components/admin/AdvertisementTable";
import useFetchBetweenAds from "../../../hooks/useFetchBetweenAds";
import Spinner from "../../../components/Loading/Spinner";
const BetweenAds = () => {
  const [betweenAds, refetch, loading] = useFetchBetweenAds();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <AdvertisementTable
          title={"Between Advertisement"}
          advertisments={betweenAds}
          updateRoute="update-between-ad"
          deleteAPI="between-ads"
          refetch={refetch}
        />
      )}
    </>
  );
};

export default BetweenAds;
