import React from "react";
import { useParams } from "react-router-dom";
import useFetchSideAds from "../../../hooks/useFetchSideAds";
import AdvertisementForm from "../../../components/admin/Advertisement Form/AdvertisementForm";

const UpdateSideAd = () => {
  const [sideAds, refetch, loading] = useFetchSideAds();

  const { id } = useParams();
  const advertisment = sideAds.find((ads) => ads._id === id);

  if (!advertisment) {
    return <h1>advertisments not found!</h1>;
  }

  return (
    <>
      <AdvertisementForm
        title={"Update Side Ad"}
        advertisment={advertisment}
        updateAPI={"side-ads"}
      />
    </>
  );
};

export default UpdateSideAd;
