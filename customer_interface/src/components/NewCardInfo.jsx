import { React } from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "../Context";

export default function NewCardInfo({ fetchCards, handleCreateOrder, OTP }) {
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const { isAuthenticated, user, location } = useAuth();
  const handleOpen = () => setOpen((cur) => !cur);

  // console.log(cardNumber)
  const handleSubmit = async () => {
    if(OTP){
        handleCreateOrder(user.customerName, user.customerPhone, location);
        // alert("Order created successfully")
        return; 
    }
    try {
      const respone = await axios.post(
        "http://localhost:4000/api/customer/payment/add",
        {
          cn: cardNumber,
          co: cardOwner,
          em: cardExpMonth,
          ey: cardExpYear,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      alert("New Card added successfully");
      await fetchCards();
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>Add your card</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add your new card
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your card information
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Card number
            </Typography>
            <Input
              label="XXXX-XXXX-XXXX"
              size="lg"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Card holder
            </Typography>
            <Input
              label="Card holder's name"
              size="lg"
              value={cardOwner}
              onChange={(e) => setCardOwner(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Expiry date
            </Typography>
            <Input
              label="mm"
              size="lg"
              value={cardExpMonth}
              onChange={(e) => setCardExpMonth(e.target.value)}
            />
            <Input
              label="yyyy"
              size="lg"
              value={cardExpYear}
              onChange={(e) => setCardExpYear(e.target.value)}
            />

            <Typography className="-mb-2" variant="h6">
              CVV
            </Typography>
            <Input label="CVC" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => {
                handleSubmit();
                handleOpen();
              }}
              fullWidth
            >
            {OTP? 'Confirm': 'Add'}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
