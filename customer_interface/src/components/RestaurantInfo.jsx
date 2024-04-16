import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";

export function RestaurantInfo({info}) {
    return (
        <Card className="mt-6 w-96  ">

            <CardBody className="text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {info.restaurantName}
                </Typography>
                <Typography>
                    MEXICAN FOOD WOOOHOOO....
                </Typography>
                <Typography className="  gap-2 ">
                    Ratings: {info.restaurantRating}
                </Typography>
                <Typography>
                    Location: University of Wollongong, NSW 2500
                </Typography>
                <Typography>
                    Phone: {info.restaurantPhone}
                </Typography>
            </CardBody>

        </Card>
    );
}