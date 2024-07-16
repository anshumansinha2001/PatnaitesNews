import React from "react";
import { useParams } from "react-router-dom";
import useFetchBetweenAds from "../../../hooks/useFetchBetweenAds";
import AdvertisementForm from "../../../components/admin/Advertisement Form/AdvertisementForm";

const UpdateBetweenAd = () => {
  const [betweenAds, refetch] = useFetchBetweenAds();

  const { id } = useParams();
  const advertisment = betweenAds.find((ads) => ads._id === id);

  if (!advertisment) {
    return <h1>advertisments not found!</h1>;
  }

  return (
    <>
      <AdvertisementForm
        title={"Update Between Ad"}
        advertisment={advertisment}
        updateAPI={"between-ads"}
      />
    </>
  );
};

export default UpdateBetweenAd;
