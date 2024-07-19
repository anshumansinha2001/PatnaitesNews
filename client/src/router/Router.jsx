import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import Sports from "../pages/Sports";
import Politics from "../pages/Politics";
import Education from "../pages/Education";
import Entertainment from "../pages/Entertainment";
import Business from "../pages/Business";
import ArticlePage from "../pages/ArticlePage";
import International from "../pages/International";
import Health from "../pages/Health";
import Weather from "../pages/Weather";

import PrivateRouter from "../Private/PrivateRouter";
import AdminPanel from "../layout/AdminPanel";
import Dashboard from "../pages/admin/Dashboard";
import Logout from "../components/admin/Logout";
import Articles from "../pages/admin/Articles";
import UpdateArticle from "../pages/admin/update/UpdateArticle";
import Profile from "../pages/admin/update/Profile";
import SideAds from "../pages/admin/advertisement/SideAds";
import UpdateSideAd from "../pages/admin/update/UpdateSideAd";
import BetweenAds from "../pages/admin/advertisement/BetweenAds";
import UpdateBetweenAd from "../pages/admin/update/UpdateBetweenAd";
import BottomAds from "../pages/admin/advertisement/BottomAds";
import UpdateBottomAds from "../pages/admin/update/UpdateBottomAds";
import CreateSideAd from "../pages/admin/create/CreateSideAd";
import CreateArticle from "../pages/admin/create/CreateArticle";
import CreateBetweenAd from "../pages/admin/create/CreateBetweenAd";
import CreateBottomAd from "../pages/admin/create/CreateBottomAd";
import Cities from "../pages/Cities";
import Technology from "../pages/Technology";
import Lifestyle from "../pages/Lifestyle";
import Travel from "../pages/Travel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />

        <Route path="cities" element={<Cities />} />
        <Route path="cities/article/:id" element={<ArticlePage />} />

        <Route path="health" element={<Health />} />
        <Route path="health/article/:id" element={<ArticlePage />} />

        <Route path="sports" element={<Sports />} />
        <Route path="sports/article/:id" element={<ArticlePage />} />

        <Route path="politics" element={<Politics />} />
        <Route path="politics/article/:id" element={<ArticlePage />} />

        <Route path="weather" element={<Weather />} />
        <Route path="weather/article/:id" element={<ArticlePage />} />

        <Route path="business" element={<Business />} />
        <Route path="business/article/:id" element={<ArticlePage />} />

        <Route path="education" element={<Education />} />
        <Route path="education/article/:id" element={<ArticlePage />} />

        <Route path="entertainment" element={<Entertainment />} />
        <Route path="entertainment/article/:id" element={<ArticlePage />} />

        <Route path="international" element={<International />} />
        <Route path="international/article/:id" element={<ArticlePage />} />

        <Route path="technology" element={<Technology />} />
        <Route path="technology/article/:id" element={<ArticlePage />} />

        <Route path="lifestyle" element={<Lifestyle />} />
        <Route path="lifestyle/article/:id" element={<ArticlePage />} />

        <Route path="travel" element={<Travel />} />
        <Route path="travel/article/:id" element={<ArticlePage />} />
      </Route>

      {/* ADMIN Routes */}
      <Route
        path="dashboard"
        element={
          <PrivateRouter>
            <AdminPanel />
          </PrivateRouter>
        }
      >
        <Route path="" element={<Dashboard />} />
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="articles" element={<Articles />} />
        <Route path="create-article" element={<CreateArticle />} />
        <Route path="update-article/:id" element={<UpdateArticle />} />
        <Route path="side-ads" element={<SideAds />} />
        <Route path="create-side-ad" element={<CreateSideAd />} />
        <Route path="update-side-ad/:id" element={<UpdateSideAd />} />
        <Route path="between-ads" element={<BetweenAds />} />
        <Route path="create-between-ad" element={<CreateBetweenAd />} />
        <Route path="update-between-ad/:id" element={<UpdateBetweenAd />} />
        <Route path="bottom-ads" element={<BottomAds />} />
        <Route path="create-bottom-ad" element={<CreateBottomAd />} />
        <Route path="update-bottom-ad/:id" element={<UpdateBottomAds />} />
      </Route>
    </>
  )
);

export default router;
