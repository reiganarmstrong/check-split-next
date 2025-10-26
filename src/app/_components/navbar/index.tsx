import Image from "next/image";
import Link from "next/link";
import Coffee from "@/../public/coffee.svg";
import CoffeeLarge from "@/../public/coffee-large.svg";
import Logo from "@/../public/logo.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
export default () => {
  return (
    <NavigationMenu className="pt-10 pb-14 w-full">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem className="gap-10">
          <NavigationMenuLink asChild>
            <Link href="/" className="">
              <div className="flex flex-row justify-center items-center text-3xl gap-2">
                <Image src={Logo} alt="logo" className="h-10 w-10" priority />
                <h1 className="font-medium underline decoration-3 decoration-pink-500">
                  CheckSplit
                </h1>
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden sm:flex">
          <NavigationMenuLink
            asChild
            className="dark bg-background text-foreground"
          >
            <Link href="/">
              <Image
                src={CoffeeLarge}
                alt="coffee-large"
                className="h-9 w-45"
                priority
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex sm:hidden">
          <NavigationMenuLink
            asChild
            className="dark bg-background text-foreground"
          >
            <Link href="/">
              <Image src={Coffee} alt="coffee" className="h-9 w-9" priority />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
