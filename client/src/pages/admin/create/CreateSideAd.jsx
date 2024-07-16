import React from "react";
import AdvertisementForm from "../../../components/admin/Advertisement Form/AdvertisementForm";

const CreateSideAd = () => {
  return (
    <div>
      <AdvertisementForm
        title="Create Side Advertisement"
        createAPI="side-ads"
      />
    </div>
  );
};

export default CreateSideAd;
