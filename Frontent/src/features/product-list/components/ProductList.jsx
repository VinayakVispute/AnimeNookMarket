import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  fetchAllProductsAsync,
  fetchProductsByFilterAsync,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Rating from "react-rating";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../app/constants";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
//Remove since not needed now but in future can needed
// const subCategories = [
//   { name: "Totes", href: "#" },
//   { name: "Backpacks", href: "#" },
//   { name: "Travel Bags", href: "#" },
//   { name: "Hip Bags", href: "#" },
//   { name: "Laptop Sleeves", href: "#" },
// ];
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      {
        value: "smartphones",
        label: "Smartphones",
        checked: false,
      },
      {
        value: "laptops",
        label: "Laptops",
        checked: false,
      },
      {
        value: "fragrances",
        label: "Fragrances",
        checked: false,
      },
      {
        value: "skincare",
        label: "Skincare",
        checked: false,
      },
      {
        value: "groceries",
        label: "Groceries",
        checked: false,
      },
      {
        value: "home-decoration",
        label: "Home decoration",
        checked: false,
      },
      {
        value: "furniture",
        label: "Furniture",
        checked: false,
      },
      {
        value: "tops",
        label: "Tops",
        checked: false,
      },
      {
        value: "womens-dresses",
        label: "Womens dresses",
        checked: false,
      },
      {
        value: "womens-shoes",
        label: "Womens shoes",
        checked: false,
      },
      {
        value: "mens-shirts",
        label: "Mens shirts",
        checked: false,
      },
      {
        value: "mens-shoes",
        label: "Mens shoes",
        checked: false,
      },
      {
        value: "mens-watches",
        label: "Mens watches",
        checked: false,
      },
      {
        value: "womens-watches",
        label: "Womens watches",
        checked: false,
      },
      {
        value: "womens-bags",
        label: "Womens bags",
        checked: false,
      },
      {
        value: "womens-jewellery",
        label: "Womens jewellery",
        checked: false,
      },
      {
        value: "sunglasses",
        label: "Sunglasses",
        checked: false,
      },
      {
        value: "automotive",
        label: "Automotive",
        checked: false,
      },
      {
        value: "motorcycle",
        label: "Motorcycle",
        checked: false,
      },
      {
        value: "lighting",
        label: "Lighting",
        checked: false,
      },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      {
        value: "Apple",
        label: "Apple",
        checked: false,
      },
      {
        value: "Samsung",
        label: "Samsung",
        checked: false,
      },
      {
        value: "OPPO",
        label: "Oppo",
        checked: false,
      },
      {
        value: "Huawei",
        label: "Huawei",
        checked: false,
      },
      {
        value: "Microsoft Surface",
        label: "Microsoft surface",
        checked: false,
      },
      {
        value: "Infinix",
        label: "Infinix",
        checked: false,
      },
      {
        value: "HP Pavilion",
        label: "Hp pavilion",
        checked: false,
      },
      {
        value: "Impression of Acqua Di Gio",
        label: "Impression of acqua di gio",
        checked: false,
      },
      {
        value: "Royal_Mirage",
        label: "Royal mirage",
        checked: false,
      },
      {
        value: "Fog Scent Xpressio",
        label: "Fog scent xpressio",
        checked: false,
      },
      {
        value: "Al Munakh",
        label: "Al munakh",
        checked: false,
      },
      {
        value: "Lord - Al-Rehab",
        label: "Lord   al rehab",
        checked: false,
      },
      {
        value: "L'Oreal Paris",
        label: "L'oreal paris",
        checked: false,
      },
      {
        value: "Hemani Tea",
        label: "Hemani tea",
        checked: false,
      },
      {
        value: "Dermive",
        label: "Dermive",
        checked: false,
      },
      {
        value: "ROREC White Rice",
        label: "Rorec white rice",
        checked: false,
      },
      {
        value: "Fair & Clear",
        label: "Fair & clear",
        checked: false,
      },
      {
        value: "Saaf & Khaas",
        label: "Saaf & khaas",
        checked: false,
      },
      {
        value: "Bake Parlor Big",
        label: "Bake parlor big",
        checked: false,
      },
      {
        value: "Baking Food Items",
        label: "Baking food items",
        checked: false,
      },
      {
        value: "fauji",
        label: "Fauji",
        checked: false,
      },
      {
        value: "Dry Rose",
        label: "Dry rose",
        checked: false,
      },
      {
        value: "Boho Decor",
        label: "Boho decor",
        checked: false,
      },
      {
        value: "Flying Wooden",
        label: "Flying wooden",
        checked: false,
      },
      {
        value: "LED Lights",
        label: "Led lights",
        checked: false,
      },
      {
        value: "luxury palace",
        label: "Luxury palace",
        checked: false,
      },
      {
        value: "Golden",
        label: "Golden",
        checked: false,
      },
      {
        value: "Furniture Bed Set",
        label: "Furniture bed set",
        checked: false,
      },
      {
        value: "Ratttan Outdoor",
        label: "Ratttan outdoor",
        checked: false,
      },
      {
        value: "Kitchen Shelf",
        label: "Kitchen shelf",
        checked: false,
      },
      {
        value: "Multi Purpose",
        label: "Multi purpose",
        checked: false,
      },
      {
        value: "AmnaMart",
        label: "Amnamart",
        checked: false,
      },
      {
        value: "Professional Wear",
        label: "Professional wear",
        checked: false,
      },
      {
        value: "Soft Cotton",
        label: "Soft cotton",
        checked: false,
      },
      {
        value: "Top Sweater",
        label: "Top sweater",
        checked: false,
      },
      {
        value: "RED MICKY MOUSE..",
        label: "Red micky mouse..",
        checked: false,
      },
      {
        value: "Digital Printed",
        label: "Digital printed",
        checked: false,
      },
      {
        value: "Ghazi Fabric",
        label: "Ghazi fabric",
        checked: false,
      },
      {
        value: "IELGY",
        label: "Ielgy",
        checked: false,
      },
      {
        value: "IELGY fashion",
        label: "Ielgy fashion",
        checked: false,
      },
      {
        value: "Synthetic Leather",
        label: "Synthetic leather",
        checked: false,
      },
      {
        value: "Sandals Flip Flops",
        label: "Sandals flip flops",
        checked: false,
      },
      {
        value: "Maasai Sandals",
        label: "Maasai sandals",
        checked: false,
      },
      {
        value: "Arrivals Genuine",
        label: "Arrivals genuine",
        checked: false,
      },
      {
        value: "Vintage Apparel",
        label: "Vintage apparel",
        checked: false,
      },
      {
        value: "FREE FIRE",
        label: "Free fire",
        checked: false,
      },
      {
        value: "The Warehouse",
        label: "The warehouse",
        checked: false,
      },
      {
        value: "Sneakers",
        label: "Sneakers",
        checked: false,
      },
      {
        value: "Rubber",
        label: "Rubber",
        checked: false,
      },
      {
        value: "Naviforce",
        label: "Naviforce",
        checked: false,
      },
      {
        value: "SKMEI 9117",
        label: "Skmei 9117",
        checked: false,
      },
      {
        value: "Strap Skeleton",
        label: "Strap skeleton",
        checked: false,
      },
      {
        value: "Stainless",
        label: "Stainless",
        checked: false,
      },
      {
        value: "Eastern Watches",
        label: "Eastern watches",
        checked: false,
      },
      {
        value: "Luxury Digital",
        label: "Luxury digital",
        checked: false,
      },
      {
        value: "Watch Pearls",
        label: "Watch pearls",
        checked: false,
      },
      {
        value: "Bracelet",
        label: "Bracelet",
        checked: false,
      },
      {
        value: "LouisWill",
        label: "Louiswill",
        checked: false,
      },
      {
        value: "Copenhagen Luxe",
        label: "Copenhagen luxe",
        checked: false,
      },
      {
        value: "Steal Frame",
        label: "Steal frame",
        checked: false,
      },
      {
        value: "Darojay",
        label: "Darojay",
        checked: false,
      },
      {
        value: "Fashion Jewellery",
        label: "Fashion jewellery",
        checked: false,
      },
      {
        value: "Cuff Butterfly",
        label: "Cuff butterfly",
        checked: false,
      },
      {
        value: "Designer Sun Glasses",
        label: "Designer sun glasses",
        checked: false,
      },
      {
        value: "mastar watch",
        label: "Mastar watch",
        checked: false,
      },
      {
        value: "Car Aux",
        label: "Car aux",
        checked: false,
      },
      {
        value: "W1209 DC12V",
        label: "W1209 dc12v",
        checked: false,
      },
      {
        value: "TC Reusable",
        label: "Tc reusable",
        checked: false,
      },
      {
        value: "Neon LED Light",
        label: "Neon led light",
        checked: false,
      },
      {
        value: "METRO 70cc Motorcycle - MR70",
        label: "Metro 70cc motorcycle   mr70",
        checked: false,
      },
      {
        value: "BRAVE BULL",
        label: "Brave bull",
        checked: false,
      },
      {
        value: "shock absorber",
        label: "Shock absorber",
        checked: false,
      },
      {
        value: "JIEPOLLY",
        label: "Jiepolly",
        checked: false,
      },
      {
        value: "Xiangle",
        label: "Xiangle",
        checked: false,
      },
      {
        value: "lightingbrilliance",
        label: "Lightingbrilliance",
        checked: false,
      },
      {
        value: "Ifei Home",
        label: "Ifei home",
        checked: false,
      },
      {
        value: "DADAWU",
        label: "Dadawu",
        checked: false,
      },
      {
        value: "YIOSI",
        label: "Yiosi",
        checked: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function discountedPrice(originalPrice, discountedPercentage) {
  const finalAmount = originalPrice * (1 - discountedPercentage / 100);
  return Math.round(finalAmount);
}

const ProductList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  //TODO : It will support multiple filters
  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      console.log(index);
      newFilter[section.id].splice(index, 1);
    }

    console.log({ newFilter });
    setFilter(newFilter);
  };

  const handleSort = (option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });

    setSort(sort);
  };

  const handlePage = (page) => {
    console.log(page);
    setPage(page);
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };

    dispatch(fetchProductsByFilterAsync(newFilter, pagination));
  };

  useEffect(() => {
    // dispatch(fetchAllProductsAsync());
    dispatch(fetchProductsByFilterAsync({ filter, sort }));
  }, [dispatch, filter, sort]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filter={filter}
          handleSort={handleSort}
          handleFilter={handleFilter}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 py-4 ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              // onClick={(e) => handleSort(option)}
                              onClick={(e) => handleSort(option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              <DesktopFilter
                filter={filter}
                handleSort={handleSort}
                handleFilter={handleFilter}
              />
              {/* Product grid start */}

              <ProductGrid />
              {/* Product grid end */}
            </div>
          </section>
          {/* Pagination Starts Here */}
          <Pagination handlePage={handlePage} page={page} setPage={setPage} />
        </main>
      </div>
    </div>
  );
};

const Pagination = ({ handlePage, page, setPage, totalItems = 92 }) => {
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </div>
          <div className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to <span className="font-medium">{page * ITEMS_PER_PAGE}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1
              ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

              {Array.from({
                length: Math.ceil(totalItems / ITEMS_PER_PAGE),
              }).map((el, index) => (
                <div
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center ${
                    index + 1 === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  } cursor-pointer px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              ))}

              {/* <div
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </div> */}
              <div
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filter,
  handleSort,
  handleFilter,
}) => {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                {/* <ul
                role="list"
                className="px-2 py-3 font-medium text-gray-900"
              >
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href} className="block px-2 py-3">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onClick={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
const DesktopFilter = ({ filter, handleSort, handleFilter }) => {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onClick={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

const ProductGrid = () => {
  const products = useSelector(selectAllProducts);

  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Link to="/ProductDetail">
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-base text-gray-700 font-semibold">
                        <Link to={product.thumbnail}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </Link>
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">
                    {product.brand}
                  </p> */}
                      <Rating
                        emptySymbol={
                          <FontAwesomeIcon
                            icon={regularStar}
                            className="text-gray-800"
                          />
                        }
                        fullSymbol={
                          <FontAwesomeIcon
                            icon={solidStar}
                            className="text-red-800"
                          />
                        }
                        placeholderSymbol={
                          <FontAwesomeIcon
                            icon={solidStar}
                            className="text-orange-400"
                          />
                        }
                        fractions={2}
                        readonly
                        placeholderRating={product.rating}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-400">
                        {product.rating}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 line-through">
                        <span className="pr-1">$</span>
                        {product.price}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        <span className="pr-1">$</span>
                        {discountedPrice(
                          product.price,
                          product.discountPercentage
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
