import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Paper } from "@mui/material";
import { useRouter } from "next/router";
const Premium = () => {
  const router = useRouter();
  // console.log("Props", router.query.n);
  // const data = ;
  console.log("Props", router.query.data1, router.query.data2);
  console.log("Date prop", router.query.data2);
  const data = router.query.data1;
  const moment = require("moment");
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                User Details
              </TableCell>
              <TableCell component="th" scope="row"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {allCars.map((row) => ( */}
            <TableRow>
              <TableCell component="th" scope="row">
                Name
              </TableCell>
              <TableCell component="th" scope="row">
                {data.userName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Age
              </TableCell>
              <TableCell component="th" scope="row">
                {data.userAge}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Car Name
              </TableCell>
              <TableCell component="th" scope="row">
                {data.carName}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Car Registration Number
              </TableCell>
              <TableCell component="th" scope="row">
                {data.carPrice}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Car Type
              </TableCell>
              <TableCell component="th" scope="row">
                {data.carType}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Car Registration Region
              </TableCell>
              <TableCell component="th" scope="row">
                {data.regRegion}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Car Make
              </TableCell>
              <TableCell component="th" scope="row">
                {data.carMake}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Car Purchase Year
              </TableCell>
              <TableCell component="th" scope="row">
                {router.query.data2}
                {/* {moment(data.carYear).format("MMMM d, YYYY")}; */}
                {/* selectedDate.toLocaleDateString() */}
                {/* {data.carYear.toLocaleDateString} */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Car Price
              </TableCell>
              <TableCell component="th" scope="row">
                {data.carPrice} AED
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Driving License Number
              </TableCell>
              <TableCell component="th" scope="row">
                {data.driverLicense}
              </TableCell>
            </TableRow>
            <TableRow
              // key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {/* {data.userAge} */}
              </TableCell>
              <TableCell component="th" scope="row">
                {/* {row.model} */}
              </TableCell>
              <TableCell component="th" scope="row">
                {/* {row.year} */}
              </TableCell>
              <TableCell component="th" scope="row">
                {/* {row.price} */}
              </TableCell>
              <TableCell component="th" scope="row">
                {/* <Link to="/buycar" state={{ row }}>
                  <Button
                    sx={{ marginLeft: "10px", color: "buyCar" }}
                    variant="outlined"
                  >
                    Buy Car
                  </Button>
                </Link> */}
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Premium;
