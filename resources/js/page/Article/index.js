import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/atom'
import { List, Navbar } from '../../components/molekul'
import { useAuth } from '../../context';
import { parseArray } from '../../utils/Parse';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';

const Article = () => {
  const { setAuthTokens, authTokens} = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    if(mounted) {
      fetchData();
    }


    return () => {
      source.cancel("Component got unmounted");
      setMounted(false);
    };
  }, [mounted]);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      const response = await Axios.get('http://127.0.0.1:8000/api/news', { headers: { Authorization: `Bearer ${authTokens}` } });
      if(response.status === 200){
        setLoading(false);
        const jsons = response.data;
        const parse = parseArray(jsons)
        setNews(parse);
        console.log(parse);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
   
  }

  const handleDelete = async id => {
    try {
      const response = await Axios.get(`http://127.0.0.1:8000/api/deletenews/${id}`, { headers: { 'Authorization': `Bearer ${authTokens}` }});
      if (response.status === 200) {
        setSuccess(true);
        fetchData();
      } else {
        setError(true);
      }      
    } catch (error) {
      setError(true);
    }
  };


  return (
    <>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {loading && <LinearProgress />}
          <Navbar/>
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
            </div>
            <div className="row">
              <h3>News</h3>
              <List type="news" data={news} handleDelete={handleDelete} />
              <div className="col-lg-12 formHospital">
                <div className="row">
                  <div className="col-lg-3">
                    <Link to="/addarticle" className="btn btn-primary btn-user btn-block">Add More Article</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-4 hiddens">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                  </div>
                  <div className="card-body">
                    <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-danger" role="progressbar" style={{width: '20%'}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-warning" role="progressbar" style={{width: '40%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-info" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <h4 className="small font-weight-bold">Account Setup <span className="float-right">Complete!</span></h4>
                    <div className="progress">
                      <div className="progress-bar bg-success" role="progressbar" style={{width: '100%'}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4 hiddens">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                    </div>
                    <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                    <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2020</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Article
