import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NftViewer from "./Components/NftViewer";
import Home from "./Components/Home";
import Royalties from "./Components/Royalties";
import Minting from "./Components/Minting";
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
                <Home />
              </>
            }
          ></Route>
          <Route path="/nftviewer" element={<NftViewer />} />
          <Route path="/royalties" element={<Royalties />} />
          <Route path="/mint" element={<Minting />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
