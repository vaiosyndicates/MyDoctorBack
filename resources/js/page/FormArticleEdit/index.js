import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Navbar } from '../../components/molekul';
import { Input } from '../../components/atom';
import Button from '../../components/atom/Button';

const FormNewsEdit = () => {
  const history = useHistory();
  const { setAuthTokens, authTokens} = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ids, setIds] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null)

  useEffect(() => {
    let mounted = true;
    const source = Axios.CancelToken.source();

    if(mounted) {
      fetchData();
    }

    return () => {
      source.cancel("Component got unmounted");
      let mounted = false;
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await Axios.get(`http://127.0.0.1:8000/api/editnews/${id}`, { headers: { Authorization: `Bearer ${authTokens}` }});
      if(response.status === 200){
        setLoading(false);
        const jsons = response.data;
        const url = jsons.thumbnail;
        setIds(jsons.id);
        setTitle(jsons.title);
        setDate(jsons.date);
        setBody(jsons.body);
        setFile(url);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
   
  }

  //END LOAD DATA

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  const saveNews= async event => {

    setLoading(true);
    event.preventDefault();
    
    try {

      const data = {
        id: id,
        title: title,
        date: date,
        body: body,
        image: (typeof file === 'object') ? await toBase64(file[0]) : file,
      }
      const response = await Axios.post(`http://127.0.0.1:8000/api/updatenews/${id}`, data, { headers: { Authorization: `Bearer ${authTokens}` }});
      if (response.status === 200) {
        console.log(response);
        setLoading(false);
        // setIds('');
        // setTitle('');
        // setDate('');
        // setBody('');
        // setFile(null);
        history.push('/article');
      } else {
        setLoading(false);
        console.log(response)
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  }; 

  return (
    <>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {loading && <LinearProgress />}
          <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
            <Alert  severity="success">
              Success!
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity="error">
              Error!
            </Alert>
          </Snackbar>
          <Navbar/>
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
            </div>
            <div className="row">
              <div className="col-lg-12 form-hospital">
                <div className="row">
                  <form className="text-center border border-light p-5" action="#!">
                    <p className="h4 mb-4">Contact us</p>
                    <Input type="text" value={title} onChange={val => setTitle(val.target.value)} placeholder="Article Title" />
                    <Input type="text" value={date} onChange={val => setDate(val.target.value)} placeholder="Date" />
                    <div className="form-group">
                      <textarea className="form-control rounded-0" rows={3} value={body} onChange={val => setBody(val.target.value)} placeholder="Article Body" />
                    </div>
                    <div className="form-group">
                      <input type="file" name="myImage" onChange={val => setFile(val.target.files)} />
                    </div>
                    <Button label="Save Article" cls="btn btn-info btn-block" onClick={(e) => saveNews(e)} />
                  </form>
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
                      <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '25rem'}} src="img/undraw_posting_photo.svg" alt="" />
                    </div>
                    <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                    <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw ???</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright ?? Your Website 2020</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default FormNewsEdit
