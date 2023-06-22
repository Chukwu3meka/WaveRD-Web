// dependencies
import { Search } from "..";
import { useState } from "react";

// interfaces
import { SearchProps, SearchResult } from "@interface/apihub/endpoints-interface";

// services
import { searchEndpoints } from "services";

function SearchContainer() {
  const [value, setValue] = useState<SearchProps["value"]>(null);
  const [inputValue, setInputValue] = useState<SearchProps["inputValue"]>("");

  const onValueChange = (newValue) => {
    setValue(newValue);
    // update value here
  };

  const onInputChange = async (newInputValue) => {
    setInputValue(newInputValue);

    console.log({ newInputValue });

    await searchEndpoints;
  };

  return <Search searchResult={searchResult} onValueChange={onValueChange} onInputChange={onInputChange} value={value} inputValue={inputValue} />;
}

export default SearchContainer;

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
// const searchResult: readonly SearchResult[] = [
const searchResult: SearchResult[] = [
  {
    id: "1719223259",
    title: "digital",
    category: "Club",
    description:
      "Adipisicing nisi officia eiusmod aliqua aute proident. In ex laboris minim ex nisi et qui duis eiusmod. Sit reprehenderit mollit id irure veniam Lorem tempor in laborum fugiat laborum. Esse laborum ut aliqua dolor mollit exercitation. Sunt officia anim non fugiat voluptate. Anim non occaecat laborum sit magna in incididunt enim consequat consectetur irure excepteur. Quis fugiat Lorem qui fugiat culpa incididunt. Est quis dolor cupidatat aliqua nostrud magna. Pariatur duis anim cillum eu id adipisicing nulla laborum. Amet minim quis laborum nulla dolor culpa.",
  },
  {
    id: "3234330334",
    title: "Stream Cotton concept",
    category: "Club",
    description:
      "Quis est Lorem est nisi ad reprehenderit velit anim incididunt tempor culpa culpa pariatur pariatur. Id sint incididunt nostrud eiusmod aliquip ullamco aute non sit. Reprehenderit fugiat amet dolor duis velit do dolore culpa sunt. Elit occaecat adipisicing tempor irure labore nulla excepteur tempor consectetur laboris. In nulla nisi in enim magna eiusmod ullamco sit velit nisi qui dolore quis. Ad tempor ex nostrud excepteur laborum adipisicing. Laboris Lorem nostrud eu excepteur officia. Nostrud laboris commodo amet commodo culpa quis quis eiusmod labore sit laborum commodo irure. Occaecat ullamco occaecat tempor occaecat duis eu quis. In magna ullamco elit excepteur. Sunt cillum ipsum pariatur pariatur nulla enim pariatur enim dolore. Magna proident consectetur officia proident voluptate ut dolor duis commodo sit nisi velit.",
  },
  {
    id: "3056516519",
    title: "application",
    category: "Club",
    description:
      "Sunt amet proident eiusmod Lorem do laboris nulla velit occaecat ipsum in cupidatat esse est. Aliquip non tempor dolore et voluptate. Nisi est tempor nostrud fugiat cillum minim exercitation labore id. In nulla exercitation nisi elit minim nostrud incididunt laboris ipsum consequat anim. Duis duis aliquip veniam proident labore exercitation tempor pariatur eu duis consectetur consectetur. Amet proident magna labore nulla pariatur laboris consectetur. Consequat ut commodo id deserunt sit cupidatat dolore ex occaecat. Ex veniam ad duis ipsum minim non et dolore reprehenderit ipsum nulla quis reprehenderit cillum. Sit pariatur dolore cillum occaecat nostrud est ea. Aute id adipisicing ut sint consectetur labore anim reprehenderit deserunt ut commodo laboris nostrud.",
  },
  {
    id: "2619412781",
    title: "synthesize",
    category: "Club",
    description:
      "Cillum aliqua consequat labore ex excepteur consequat fugiat quis adipisicing ipsum. Fugiat officia mollit minim nostrud sunt magna cupidatat velit nisi. Occaecat et aliquip reprehenderit ad. Anim nisi velit aliqua eu. Eu commodo fugiat excepteur ut reprehenderit. Commodo consequat culpa magna veniam est ut dolor sit. Eu magna excepteur et aute officia elit. Magna ullamco quis aute tempor exercitation culpa officia culpa elit ea reprehenderit duis. Qui consectetur id non proident nisi ea est. Do ex aliqua nisi irure non officia est ad id officia dolor aliquip.",
  },
  {
    id: "1372532757",
    title: "Intelligent",
    category: "Club",
    description:
      "Ad dolor cillum qui consequat tempor occaecat. Et nisi ut laborum amet consequat ex Lorem pariatur. Magna adipisicing consectetur est consectetur dolor mollit tempor fugiat pariatur aute nostrud elit eiusmod. In minim cillum irure nisi occaecat cupidatat minim enim sunt eu laboris. Velit mollit nulla nisi ex eu esse anim irure nisi Lorem consectetur incididunt. Est mollit nulla eiusmod ipsum ullamco aliquip culpa tempor labore adipisicing incididunt exercitation. Eu commodo ut voluptate ea incididunt dolore sunt. Do amet fugiat quis tempor proident irure reprehenderit quis veniam. Reprehenderit fugiat Lorem duis ut sit consequat mollit occaecat.",
  },
  {
    id: "6181421",
    title: "Salad Islands",
    category: "Club",
    description:
      "Non eiusmod incididunt ea sit velit fugiat qui. Ea ex exercitation id anim magna officia culpa deserunt cupidatat cupidatat qui. In et ea cupidatat dolore esse laboris non adipisicing deserunt. Voluptate sunt consectetur adipisicing amet magna minim. Amet occaecat id cillum non occaecat pariatur eu fugiat mollit ad minim minim ipsum eu. Magna ullamco qui labore nisi aute anim irure aute minim. Nisi deserunt cillum ea ut amet officia ullamco Lorem enim consequat aute cillum cupidatat cupidatat. Lorem amet magna elit veniam ipsum qui excepteur. Velit Lorem eiusmod velit dolor dolor enim eu non excepteur cupidatat pariatur. Ipsum dolore in mollit id ipsum qui amet tempor. Deserunt incididunt ea aute velit Lorem duis excepteur consequat ea do minim nisi. Ut cupidatat nisi irure commodo aliquip amet elit consectetur cupidatat irure enim velit. Occaecat ut laboris dolor magna esse cupidatat dolore elit consectetur.",
  },
  {
    id: "953416427",
    title: "leading-edge Brand",
    category: "Club",
    description:
      "Laborum aliquip quis esse velit duis nulla Lorem incididunt voluptate dolore. Ullamco aliqua est consequat amet pariatur eiusmod eiusmod aliqua laborum in sit occaecat. Sunt consequat nisi esse quis eiusmod. Cillum eu eu cillum duis. Nulla elit ipsum ut sit commodo voluptate. Irure dolore aliqua culpa qui ad. Cillum dolor et elit sint id. Id aute dolor ipsum deserunt ullamco nisi eiusmod sint qui non id ex commodo ea. Cupidatat consectetur proident cupidatat ut consectetur Lorem officia reprehenderit est sit. Labore Lorem ex veniam fugiat aliqua velit nostrud mollit officia anim.",
  },
  {
    id: "287411132",
    title: "pixel",
    category: "Club",
    description:
      "Dolor Lorem dolor officia ullamco ex. Lorem non magna sint cillum proident ullamco est ex. Cupidatat qui ea laboris aute labore cillum nostrud aliqua veniam nisi. Dolor nisi mollit dolore anim. Est non ea ex voluptate incididunt consectetur nisi et in voluptate sit do. Consequat Lorem excepteur cupidatat cupidatat et deserunt excepteur non. Officia incididunt qui nisi dolor deserunt dolore labore dolore deserunt tempor labore. Occaecat occaecat anim duis ullamco mollit. Eu aliqua duis aute velit sit sunt commodo sint commodo ad. Elit anim quis sunt voluptate Lorem sit elit est eu voluptate sunt mollit. Culpa ea eu fugiat dolor mollit officia magna consectetur incididunt eiusmod reprehenderit.",
  },
  {
    id: "1080232305",
    title: "Games backing",
    category: "Club",
    description:
      "Est nulla pariatur dolore Lorem sint cupidatat laborum sint aliquip eiusmod. Laborum cillum aliqua amet exercitation tempor aliqua. Culpa officia do adipisicing aliquip sit adipisicing reprehenderit nisi proident anim. Adipisicing laboris anim et occaecat ex culpa culpa elit qui incididunt. Ex consectetur occaecat sint est. In minim sint qui tempor ut nulla esse incididunt Lorem. Cupidatat amet dolore ad veniam consectetur. Non esse elit eu esse consectetur ipsum laborum ad.",
  },
  {
    id: "2060915294",
    title: "convergence Interactions",
    category: "Club",
    description:
      "Sint ullamco magna dolore nisi ad id id quis sit eiusmod. Incididunt aute officia non voluptate fugiat quis velit do ullamco proident. Culpa eu duis labore magna sint non aute velit ullamco. Mollit magna esse consequat proident aliqua duis. Culpa proident aliqua velit dolore laboris non pariatur laborum officia voluptate eu et. Ex reprehenderit occaecat nulla ipsum consequat et ea consectetur exercitation aute sit. Enim elit nostrud do enim in aute velit magna reprehenderit aliqua nostrud ea. Reprehenderit occaecat occaecat aute occaecat officia esse mollit aliqua ea pariatur esse sint consectetur.",
  },
];
