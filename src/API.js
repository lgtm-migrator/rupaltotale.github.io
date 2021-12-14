import _ from "lodash";
import Experiences from "./Data/Experiences.json";
import Education from "./Data/Education.json";
import Projects from "./Data/Projects.json";

export default class API {
  constructor() {
    this.allTags = [];
    this.tagsFiltered = false;
    this.data = {
      Experiences: Experiences,
      Education: Education,
      Projects: Projects,
    };
  }

  get(type, completion) {
    completion(this.getDataAsObjects(this.data[type]));
  }

  getDataAsObjects(data) {
    return data
      .map(item => ( {
        ...item,
        startTime: item.startTime ? item.startTime : item.term,
        tags: item.tags
          .map((tag) => {
            const value = tag.toLowerCase().trim();
            const tagObj = {
              value,
              label: this.getTagFormatted(value),
            };
            this.allTags.push(tagObj);
            return tagObj;
          })
          .sort((tag1, tag2) => tag1.value.localeCompare(tag2.value)),
      } ))
      .sort(this.getSortByDate());
  }

  getSortByDate() {
    const comparisonArray = [
      "Winter",
      "Jan",
      "Feb",
      "Mar",
      "Spring",
      "Apr",
      "May",
      "Jun",
      "Summer",
      "Jul",
      "Aug",
      "Sep",
      "Fall",
      "Oct",
      "Nov",
      "Dec",
      "Present",
    ];
    const currentYear = new Date().getFullYear().toString();
    return (obj1, obj2) => {
      const date1 = obj1.endTime ? obj1.endTime.split(" ") : obj1.startTime.split(" ");
      const date2 = obj2.endTime ? obj2.endTime.split(" ") : obj2.startTime.split(" ");
      if (date1.length < 2) {
        date1.push(currentYear);
      }
      if (date2.length < 2) {
        date2.push(currentYear);
      }
      if (date1[1] === date2[1]) { // the year is the same...
        return (
          comparisonArray.indexOf(date2[0]) - comparisonArray.indexOf(date1[0])
        );
      }
      return date2[1] - date1[1];
    };
  }

  getTagFormatted(tag: string): String {
    const special = {
      npm: "npm",
      javascript: "JavaScript",
      react: "React",
      "react-native": "React-Native",
      html: "HTML",
      css: "CSS",
      sql: "SQL",
      scss: "SCSS",
      mongodb: "MongoDB",
      mysql: "MySQL",
      express: "Express",
      xcode: "XCode",
      jquery: "jQuery",
      php: "PHP",
      "android studio": "Android Studio",
      json: "JSON",
      "ruby on rails": "Ruby on Rails",
      "sql server": "SQL Server",
      wordpress: "WordPress",
      "visual basic": "Visual Basic",
      "jdbc": "JDBC",
      "machine learning": "Machine Learning / AI",
    };
    const displayTag = special[tag];
    return displayTag ? displayTag : tag[0].toUpperCase() + tag.slice(1);
  }

  getUniqueTags(shouldReturn: boolean) {
    if (shouldReturn)
      return _.uniqBy(this.allTags, "value").sort(function(tag1, tag2) {
        return tag1.value.localeCompare(tag2.value);
      });
    return [];
  }
}
