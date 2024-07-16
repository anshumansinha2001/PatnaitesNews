import AdvertisementTable from "../../../components/admin/AdvertisementTable";
import useFetchBottomAds from "../../../hooks/useFetchBottomAds";

const BottomAds = () => {
  const [bottomAds, refetch] = useFetchBottomAds();

  return (
    <AdvertisementTable
      title={"Bottom Advertisement"}
      advertisments={bottomAds}
      updateRoute="update-bottom-ad"
      deleteAPI="bottom-ads"
      refetch={refetch}
    />
  );
};

export default BottomAds;
