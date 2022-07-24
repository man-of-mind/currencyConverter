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
import data from './currencyRate.json';

function App() {
  const date = new Date().toLocaleDateString();
  const symbols = data.symbols;
  const allRates = Object.entries(data.rate.results);

  
  const [show, setShow] = React.useState<Boolean>(false);
  const [fromCurrency, setFromCurrency] = React.useState<string>('');
  const [toCurrency, setToCurrency] = React.useState<string>('');
  const [amount, setAmount] = React.useState(1);
  const [result, setResult] = React.useState(0);

  const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromCurrency(event.target.value);
    setShow(false)
  };

  const handleChangeTO = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToCurrency(event.target.value)
    setShow(false)
  };

  const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
    setShow(false)
  };

  const convertCurrency = () => {
    const currencyProp = allRates.filter(([symbol, value]) => {
      return symbol === fromCurrency
    });
    const currencyRate = currencyProp[0][1];
    const equivalentUSD = Number(amount) / currencyRate ;
    const toCurrencyProp = allRates.filter(([sym, val]) => sym === toCurrency);
    const answer = equivalentUSD * toCurrencyProp[0][1];
    setResult(Number(answer.toFixed(3)));
    setShow(true);
  }
  

  return (
    <div className={styles["App"]}>
      <Card sx={{width: 700}}>
        <CardContent>
          <Typography align='center' sx={{fontWeight: 700, fontSize: 28, padding: '10px 40px'}} variant='h1'>
            CURRENCY CONVERTER
          </Typography>
          <Divider/>
          <>{show ?
            (<><Typography align='center' variant='h4' sx={{paddingTop: 3, paddingBottom: 2, fontSize: 22}}>
              {amount} {fromCurrency} is equivalent to
            </Typography> 
            <Typography align='center' variant='h4' sx={{fontSize: 26, fontWeight: 700, paddingBottom: '20px'}}>
            {`${result}${toCurrency}`}
            </Typography>
            <Typography align='center' sx={{fontSize: 16, color: 'gray'}}>
              As of {date}
            </Typography></>) 
          : (null)}</>
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
                {symbols.map((curr) => (
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
                {symbols.map((curr) => (
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
