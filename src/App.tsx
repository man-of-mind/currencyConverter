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

  const initialState = {
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: 1,
    result: 0.98,
    updateFrom: 'USD',
    updateTo: 'EUR',
    updateAmount: 1
  }

  const [states, setState] = React.useState(initialState);

  const handleChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...initialState,
      fromCurrency: event.target.value
    })
  };

  const handleChangeTO = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...initialState,
      toCurrency: event.target.value
    })
  };

  const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...initialState,
      amount: Number(event.target.value)
    });
  };

  const convertCurrency = () => {
    const currencyProp = allRates.filter(([symbol, value]) => {
      return symbol === states.fromCurrency
    });
    const currencyRate = currencyProp[0][1];
    const equivalentUSD = Number(states.amount) / currencyRate ;
    const toCurrencyProp = allRates.filter(([sym, val]) => sym === states.toCurrency);
    const answer = equivalentUSD * toCurrencyProp[0][1];
    setState({
      fromCurrency: states.fromCurrency,
      toCurrency: states.toCurrency,
      amount: states.amount,
      result: Number(answer.toFixed(3)),
      updateAmount: states.amount,
      updateTo: states.toCurrency,
      updateFrom: states.fromCurrency
    });
  }
  

  return (
    <div className={styles["App"]}>
      <Card sx={{width: 700}}>
        <CardContent>
          <Typography align='center' sx={{fontWeight: 700, fontSize: 28, padding: '10px 40px'}} variant='h1'>
            CURRENCY CONVERTER
          </Typography>
          <Divider/>
          <Typography align='center' variant='h4' sx={{paddingTop: 3, paddingBottom: 2, fontSize: 22}}>
            {states.updateAmount} {states.updateFrom} is equivalent to
          </Typography>
          <Typography align='center' variant='h4' sx={{fontSize: 26, fontWeight: 700, paddingBottom: '20px'}}>
            {`${states.result}${states.updateTo}`}
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
                value={states.amount}
                onChange={handleChangeRate}
                InputProps={{
                  readOnly: false
                }}
              />
              <TextField
                id="filled-select-currency-native"
                select
                label="Currencies"
                value={states.fromCurrency}
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
              <TextField id="filled-basic" label="" variant="filled" value={states.result} sx={{width: 200}}/>
              <TextField
                id="filled-select-currency-native"
                select
                label="Currencies"
                value={states.toCurrency}
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
