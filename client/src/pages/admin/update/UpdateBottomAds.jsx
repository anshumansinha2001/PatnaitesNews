import React from "react";
import { useParams } from "react-router-dom";
import useFetchBottomAds from "../../../hooks/useFetchBottomAds";
import AdvertisementForm from "../../../components/admin/Advertisement Form/AdvertisementForm";

const UpdateBottomAds = () => {
  const [bottomAds, refetch] = useFetchBottomAds();
  const { id } = useParams();
  const advertisment = bottomAds.find((ads) => ads._id === id);

  if (!advertisment) {
    return <h1>advertisments not found!</h1>;
  }
  return (
    <>
      <AdvertisementForm
        title={"Update Bottom Ad"}
        advertisment={advertisment}
        updateAPI={"bottom-ads"}
      />
    </>
  );
};

export default UpdateBottomAds;
