import React from "react";
import AdvertisementForm from "../../../components/admin/Advertisement Form/AdvertisementForm";

const CreateBetweenAd = () => {
  return (
    <div>
      <AdvertisementForm
        title="Create Between Advertisement"
        createAPI="between-ads"
      />
    </div>
  );
};

export default CreateBetweenAd;
