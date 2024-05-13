import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "../Context";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
export function Details() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newName, setNewName] = useState("");
  const { isAuthenticated, user, setUser } = useAuth();
  const navigate = useNavigate()
  const getCustomerInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/customer/information",
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      console.log("customer information: ", response.data);
      setUser(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  //Handle edit Email
  const handleEditEmail = async (newEmail) => {
    try {
      const respone = await axios.post(
        "http://localhost:4000/api/customer/edit/email",
        {
          newEmail,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      alert("Edit email successfully. you will be logged out now.");
      navigate('/')
    } catch (e) {
      throw new Error(e);
    }
  };

  //Handle edit Name
  // const handleEditName = async (newName) => {
  //   try {
  //     const respone = await axios.post('http://localhost:4000/api/customer/edit/name', {
  //       newName
  //     }, {
  //       headers: {
  //         Authorization: isAuthenticated
  //       }
  //     })

  //     alert(respone.data.message)
  //   } catch (e) {
  //     throw new Error(e)
  //   }
  // }

  //Handle edit Phone
  const handleEditPhone = async (newPhone) => {
    try {
      const respone = await axios.post(
        "http://localhost:4000/api/customer/edit/phone",
        {
          newPhone,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      alert(respone.data.message);
    } catch (e) {
      throw new Error(e);
    }
  };

  //Handle edit Password
  const handleEditPassword = async (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    try {
      const respone = await axios.post(
        "http://localhost:4000/api/customer/edit/password",
        {
          newPassword,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );

      alert("Edit password successfully, you will be logged out now.");
      navigate('/')
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  return (
    <Card color="transparent" shadow={true} className="items-center">
      <Typography variant="h4" color="blue-gray">
        Details
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Change your information here.
      </Typography>
      <form className="mt-8 mb-2 w-80  sm:w-[500px]">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            defaultValue={user.customerEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Button onClick={() => handleEditEmail(newEmail)}>Save</Button>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="Nguyen Van A"
            defaultValue={user.customerName}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Button>Save</Button>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Phone
          </Typography>
          <Input
            size="lg"
            placeholder="(+81) 123 456 789"
            // value={user.customerName}
            onChange={(e) => setNewPhone(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Button
            onClick={() => {
              handleEditPhone(newPhone);
            }}
          >
            Save
          </Button>

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            onChange={(e) => setNewPassword(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Confirm Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Button
            onClick={() => handleEditPassword(newPassword, confirmPassword)}
          >
            Save
          </Button>
        </div>

        <Button className="mt-6">Save all changes</Button>
      </form>
    </Card>
  );
}
