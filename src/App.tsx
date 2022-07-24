import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './App.module.scss';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'

function App() {
  const date = new Date().toLocaleDateString();
  const API_KEY = "z3wFSr5RGhyLzE81nRDW09n90fBDU1Wi";

  const instance = axios.create(
    {
      baseURL: 'https://api.apilayer.com/exchangerates_data',
      headers: {'apiKey': API_KEY}
    });

  const [currencies, setCurrencies] = React.useState<Array<string>>(['USD', 'EUR'])

  const [fromCurrency, setCurrencyFrom] = React.useState<string>('USD');
  const [result, setResult] = React.useState<number>(0);
  const [amount, setAmount] = React.useState('1');
  const [toCurrency, setCurrencyTo] = React.useState<string>('EUR');

  const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyFrom(event.target.value);
  };

  const handleChangeTO = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyTo(event.target.value);
  };

  const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const convertCurrency = () => {
    console.log('convert');
    instance.get(`convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`).then(res =>
      console.log(res.data)).catch(err => alert(`Error Occurred detailing: ${err.message}`))
  }
  
 

  

  

  React.useEffect(() => {

    instance.get('/symbols').then((res) => 
    setCurrencies(Object.keys(res.data.symbols)));
  }, [instance])

  return (
    <div className={styles["App"]}>
      <Card sx={{width: 700}}>
        <CardContent>
          <Typography align='center' sx={{fontWeight: 700, fontSize: 28, padding: '10px 40px'}} variant='h1'>
            CURRENCY CONVERTER
          </Typography>
          <Divider/>
          <Typography align='center' variant='h4' sx={{paddingTop: 3, paddingBottom: 2, fontSize: 22}}>
            {amount} {fromCurrency} is equivalent to
          </Typography>
          <Typography align='center' variant='h4' sx={{fontSize: 26, fontWeight: 700, paddingBottom: '20px'}}>
            {`${result}${toCurrency}`}
          </Typography>
          <Typography align='center' sx={{fontSize: 16, color: 'gray'}}>
            As of {date}
          </Typography>
        </CardContent>
        <CardContent sx={{display: 'inline'}}>
          <Box>
            <div className={styles['input-cont']}>
              <TextField
                id="standard-number"
                variant="standard"
                type="number"
                value={amount}
                onChange={handleChangeRate}
                InputProps={{
                  readOnly: false
                }}
              />
              <TextField
                id="filled-select-currency-native"
                select
                label="Currencies"
                value={fromCurrency}
                onChange={handleChangeFrom}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                sx={{width: '100px'}}
                >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </TextField>
            </div>
          </Box>
          <Box sx={{display: 'inline'}} component="div">
            <div className={styles['input-cont']}>
              <TextField id="filled-basic" label="" variant="filled" value={result} sx={{width: 200}}/>
              <TextField
                id="filled-select-currency-native"
                select
                label="Currencies"
                value={toCurrency}
                onChange={handleChangeTO}
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                sx={{width: '100px'}}
                >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </TextField>
            </div>
          </Box>
        </CardContent>
        <CardActions>
          <Button 
            variant="contained" 
            onClick={convertCurrency} 
            sx={{marginLeft: 'auto', marginRight: 'auto'}}
            >
              Convert
            </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default App;
