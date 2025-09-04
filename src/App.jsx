import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SunnyIcon from "@mui/icons-material/Sunny";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment/locale/ar";
import { useEffect, useState } from "react";
// moment.locale("ar");
function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLange] = useState("en");
  const [date, setDate] = useState(moment().format("L"));
  const [data, setData] = useState({
    temp: null,
    minTemp: null,
    maxTemp: null,
    name: "",
    weatherState: "",
    icon: null,
  });
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=28.00&lon=3.00&appid={ur api key}&units=metric"

        // cancelToken: new axios.CancelToken((c) => {
        //   cancelToken = c;
        // }),
      )
      .then((response) => {
        const data = response.data;
        const Round = (val) => Math.round(val);
        setData({
          temp: Round(data.main.temp),
          minTemp: Round(data.main.temp_min),
          maxTemp: Round(data.main.temp_max),
          name: data.name,
          weatherState: data.weather[0].description,
          icon: data.weather[0].icon,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // return () => {
    //   console.log("cancel ");
    //   cancelToken();
    // };
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: green[500],
      },
    },
    typography: {
      fontFamily: "playpen",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container
            maxWidth="sm"
            dir={lang === "en" ? "lft" : "rtl"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Card sx={{ minWidth: 320, bgcolor: "rgba(0,0,0,0.2)" }}>
              <CardContent>
                <Stack
                  direction={"row"}
                  spacing={4}
                  display={"flex"}
                  alignItems={"flex-end"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h3">{t(data.name)}</Typography>
                  <Typography variant="body2">{date}</Typography>
                </Stack>
                <Divider sx={{ margin: "10px", bgcolor: "white" }} />
                <Grid container height={"100px"} spacing={3}>
                  <Grid
                    size={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Stack
                      spacing={4}
                      direction={"row"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography variant="h3">{data.temp}</Typography>
                      <img
                        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                        width={"50px"}
                      />
                    </Stack>
                    <Typography variant="subtitle2" textAlign={"left"}>
                      {t(data.weatherState)}
                    </Typography>
                    <Stack
                      spacing={0}
                      direction={"row"}
                      display={"flex"}
                      justifyContent={"space-evenly"}
                      alignItems={"center"}
                    >
                      <Typography variant="caption">
                        {t("min")}: {data.minTemp}
                      </Typography>
                      <Divider
                        sx={{ bgcolor: "white", height: "60%", margin: "10px" }}
                        orientation="vertical"
                      />
                      <Typography variant="caption">
                        {t("max")}: {data.maxTemp}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid
                    size={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                      width={"120px"}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                minWidth: 320,
              }}
            >
              <Button
                variant="text"
                sx={{ textTransform: "none", margin: "5px", color: "white" }}
                onClick={() => {
                  i18n.changeLanguage(lang === "en" ? "ar" : "en");
                  setLange((lang) => {
                    return lang === "en" ? "ar" : "en";
                  });
                }}
              >
                {lang === "en" ? "Arabic" : "الإنجليزية"}
              </Button>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
