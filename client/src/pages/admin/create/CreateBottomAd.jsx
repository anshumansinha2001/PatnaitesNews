import React from "react";
import AdvertisementForm from "../../../components/admin/Advertisement Form/AdvertisementForm";

const CreateBottomAd = () => {
  return (
    <div>
      <AdvertisementForm
        title="Create Bottom Advertisement"
        createAPI="bottom-ads"
      />
    </div>
  );
};

export default CreateBottomAd;
