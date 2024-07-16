import React, { useEffect } from "react";
import AdvertisementTable from "../../../components/admin/AdvertisementTable";
import useFetchBetweenAds from "../../../hooks/useFetchBetweenAds";
const BetweenAds = () => {
  const [betweenAds, refetch] = useFetchBetweenAds();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <AdvertisementTable
      title={"Between Advertisement"}
      advertisments={betweenAds}
      updateRoute="update-between-ad"
      deleteAPI="between-ads"
      refetch={refetch}
    />
  );
};

export default BetweenAds;
