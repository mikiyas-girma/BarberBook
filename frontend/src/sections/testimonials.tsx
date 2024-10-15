import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Testimonials() {
  return (
    <>
      <div className=" font-merriweather bg-center bg-[#1f1f1f]">
        <CardContent>
            <div>
                <div className="text-3xl p-10 text-center font-chakra">
                    What Our Client Says
                </div>
                <div className="flex max-w-screen-xl gap-x-12 justify-around">
                    <Card className="bg-transparent bg-blur-600 ">
                        <CardHeader className="text-center text-sm"> 
                            <CardTitle>John Doe</CardTitle>
                            <div>⭐⭐⭐⭐⭐</div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="max-w-sm">
                                "The service was excellent! I highly recommend this barber shop to anyone looking for a great haircut."
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#AF8447] text-white">
                        <CardHeader className="text-center text-sm"> 
                            <CardTitle>John Doe</CardTitle>
                            <div>⭐⭐⭐⭐⭐</div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="max-w-sm text-white">
                                "The service was excellent! I highly recommend this barber shop to anyone looking for a great haircut."
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-transparent">
                        <CardHeader className="text-center text-sm"> 
                            <CardTitle>John Doe</CardTitle>
                            <div>⭐⭐⭐⭐⭐</div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="max-w-sm">
                                "The service was excellent! I highly recommend this barber shop to anyone looking for a great haircut."
                            </CardDescription>
                        </CardContent>
                    </Card>
                    
                </div>
            </div>
            <div></div>
        </CardContent>
      </div>
    </>
  );
}
