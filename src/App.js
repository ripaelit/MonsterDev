import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Homepage from "./Components/Homepage";
import Mintpage from "./Components/Mintpage";
import Royaltiespage from "./Components/Royaltiespage";
import NftViewerpage from "./Components/NftViewerpage";
import Footer from "./Components/Footer";
import { Provider } from "react-redux"
import store from "./Resource/store"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Homepage />
              </>
            }
          ></Route>
          <Route path="/mint" element={<Mintpage />} />
          <Route path="/royalties" element={<Royaltiespage />} />
          <Route path="/nftviewer" element={<NftViewerpage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
