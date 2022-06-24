import { createSignal, onMount } from "solid-js";
import { ETags } from "../../../enums/ETags";
import styles from "./Projects.module.scss";


type TTags = ETags.srategy | ETags.dev | ETags.des | ETags.all;
interface IProject {
  title: string;
  developers: number;
  months: number;
  tags: TTags[];
  desc: string;
  img: string;
  slug: string;
}
interface IProjectsProps {
  projects: IProject[];
  url?: any;
}

export function Projects(props: IProjectsProps) {
  const [sort, setSort] = createSignal(props.projects);
  const [active, setActive] = createSignal(ETags.all)
  onMount(() => {
    const from = window.location.search.split("=")[1];
    if (from === "1") {
      setSort(props.projects.filter(i => i.tags.some((el) => el === ETags.srategy)))
      setActive(ETags.srategy)
    }
  })
  function handleClick(tag: TTags) {
    if (tag === ETags.all) {
      setSort(props.projects);
    } else {
      setSort(props.projects.filter(i => i.tags.some((el) => el === tag)))
    }
    setActive(tag)
  }
  ""
  return (
    <div class={styles.project}>
      <div class={styles.project__controls}>
        <button
          class={styles.project__control}
          classList={{ [styles.project__control_active]: active() === ETags.all }}
          onClick={() => handleClick(ETags.all)}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00003 4.50001C12.418 6.71001 17.79 12.082 20 16.5C22.209 20.918 20.418 22.71 16 20.5C11.582 18.29 6.20903 12.918 4.00003 8.50001C1.79003 4.08201 3.58203 2.29101 8.00003 4.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16 4.50001C20.418 2.29101 22.209 4.08201 20 8.50001C17.79 12.918 12.418 18.29 8.00003 20.5C3.58203 22.709 1.79003 20.918 4.00003 16.5C6.20903 12.082 11.582 6.71001 16 4.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.2502 12.625C12.2502 12.5918 12.2371 12.5601 12.2136 12.5366C12.1902 12.5132 12.1584 12.5 12.1252 12.5C12.0921 12.5 12.0603 12.5132 12.0369 12.5366C12.0134 12.5601 12.0002 12.5918 12.0002 12.625C12.0002 12.6582 12.0134 12.6899 12.0369 12.7134C12.0603 12.7368 12.0921 12.75 12.1252 12.75C12.1584 12.75 12.1902 12.7368 12.2136 12.7134C12.2371 12.6899 12.2502 12.6582 12.2502 12.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          All projects
        </button>
        <button
          class={styles.project__control}
          classList={{ [styles.project__control_active]: active() === ETags.dev }}
          onClick={() => handleClick(ETags.dev)}
        >
          <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99809 17.503C6.33496 17.503 5.69897 17.2397 5.22997 16.7708C4.76097 16.302 4.49736 15.6661 4.49709 15.003V12C4.49683 11.3369 4.23321 10.701 3.76421 10.2322C3.29521 9.76337 2.65923 9.50001 1.99609 9.50001C2.65923 9.49974 3.29511 9.23613 3.76392 8.76713C4.23273 8.29813 4.49609 7.66214 4.49609 6.99901V3.99801C4.49609 3.66949 4.56082 3.34419 4.68657 3.04069C4.81232 2.73719 4.99663 2.46143 5.22897 2.22918C5.46132 1.99693 5.73714 1.81273 6.0407 1.6871C6.34425 1.56147 6.66957 1.49688 6.99809 1.49701" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.002 1.49701C17.6651 1.49701 18.3011 1.76037 18.7701 2.22918C19.2391 2.69799 19.5027 3.33388 19.503 3.99701V7.00001C19.5032 7.66314 19.7668 8.29903 20.2358 8.76784C20.7048 9.23665 21.3408 9.50001 22.004 9.50001C21.3408 9.50027 20.7049 9.76389 20.2361 10.2329C19.7673 10.7019 19.504 11.3379 19.504 12.001V15.002C19.504 15.3305 19.4392 15.6558 19.3135 15.9593C19.1877 16.2628 19.0034 16.5386 18.7711 16.7708C18.5387 17.0031 18.2629 17.1873 17.9594 17.3129C17.6558 17.4385 17.3305 17.5031 17.002 17.503" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.0502 9.57301C12.0502 9.56644 12.0489 9.55994 12.0464 9.55388C12.0439 9.54781 12.0402 9.5423 12.0356 9.53765C12.0309 9.53301 12.0254 9.52933 12.0193 9.52682C12.0133 9.5243 12.0068 9.52301 12.0002 9.52301C11.9936 9.52301 11.9871 9.5243 11.9811 9.52682C11.975 9.52933 11.9695 9.53301 11.9648 9.53765C11.9602 9.5423 11.9565 9.54781 11.954 9.55388C11.9515 9.55994 11.9502 9.56644 11.9502 9.57301C11.9502 9.58627 11.9555 9.59899 11.9648 9.60837C11.9742 9.61774 11.9869 9.62301 12.0002 9.62301C12.0135 9.62301 12.0262 9.61774 12.0356 9.60837C12.0449 9.59899 12.0502 9.58627 12.0502 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.6 9.57301C8.6 9.56644 8.59871 9.55994 8.59619 9.55388C8.59368 9.54781 8.59 9.5423 8.58536 9.53765C8.58071 9.53301 8.5752 9.52933 8.56913 9.52682C8.56307 9.5243 8.55657 9.52301 8.55 9.52301C8.54343 9.52301 8.53693 9.5243 8.53087 9.52682C8.5248 9.52933 8.51929 9.53301 8.51464 9.53765C8.51 9.5423 8.50632 9.54781 8.50381 9.55388C8.50129 9.55994 8.5 9.56644 8.5 9.57301C8.5 9.58627 8.50527 9.59899 8.51464 9.60837C8.52402 9.61774 8.53674 9.62301 8.55 9.62301C8.56326 9.62301 8.57598 9.61774 8.58536 9.60837C8.59473 9.59899 8.6 9.58627 8.6 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.0512 9.57301C15.0512 9.55975 15.0459 9.54703 15.0365 9.53765C15.0271 9.52828 15.0144 9.52301 15.0012 9.52301C14.9879 9.52301 14.9752 9.52828 14.9658 9.53765C14.9564 9.54703 14.9512 9.55975 14.9512 9.57301C14.9512 9.58627 14.9564 9.59899 14.9658 9.60837C14.9752 9.61774 14.9879 9.62301 15.0012 9.62301C15.0144 9.62301 15.0271 9.61774 15.0365 9.60837C15.0459 9.59899 15.0512 9.58627 15.0512 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Development
        </button>
        <button
          class={styles.project__control}
          classList={{ [styles.project__control_active]: active() === ETags.des }}
          onClick={() => handleClick(ETags.des)}
        >
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3.5H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.5C5 4.03043 4.78929 4.53914 4.41421 4.91421C4.03914 5.28929 3.53043 5.5 3 5.5C2.46957 5.5 1.96086 5.28929 1.58579 4.91421C1.21071 4.53914 1 4.03043 1 3.5C1 2.96957 1.21071 2.46086 1.58579 2.08579C1.96086 1.71071 2.46957 1.5 3 1.5C3.53043 1.5 4.03914 1.71071 4.41421 2.08579C4.78929 2.46086 5 2.96957 5 3.5V3.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2958 14.683L15.8348 15.717C15.5578 15.8336 15.3374 16.0539 15.2208 16.331L14.1838 18.796C14.0919 19.015 13.9345 19.2003 13.7331 19.3262C13.5317 19.4522 13.2963 19.5127 13.0591 19.4994C12.8219 19.4862 12.5947 19.3998 12.4086 19.2522C12.2225 19.1045 12.0867 18.9029 12.0198 18.675L10.0478 11.976C9.98943 11.7777 9.98556 11.5674 10.0366 11.3672C10.0876 11.1669 10.1917 10.9841 10.3378 10.838C10.4839 10.6919 10.6667 10.5878 10.867 10.5368C11.0673 10.4857 11.2776 10.4896 11.4758 10.548L18.1748 12.519C18.4027 12.586 18.6042 12.7219 18.7518 12.908C18.8993 13.0942 18.9855 13.3215 18.9987 13.5586C19.0118 13.7958 18.9512 14.0312 18.8252 14.2325C18.6992 14.4339 18.5139 14.5912 18.2948 14.683H18.2958Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 5.5V15.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17 8.5V5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3.5C15 2.96957 15.2107 2.46086 15.5858 2.08579C15.9609 1.71071 16.4696 1.5 17 1.5C17.5304 1.5 18.0391 1.71071 18.4142 2.08579C18.7893 2.46086 19 2.96957 19 3.5C19 4.03043 18.7893 4.53914 18.4142 4.91421C18.0391 5.28929 17.5304 5.5 17 5.5C16.4696 5.5 15.9609 5.28929 15.5858 4.91421C15.2107 4.53914 15 4.03043 15 3.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 17.5H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 19.5C2.46957 19.5 1.96086 19.2893 1.58579 18.9142C1.21071 18.5391 1 18.0304 1 17.5C1 16.9696 1.21071 16.4609 1.58579 16.0858C1.96086 15.7107 2.46957 15.5 3 15.5C3.53043 15.5 4.03914 15.7107 4.41421 16.0858C4.78929 16.4609 5 16.9696 5 17.5C5 18.0304 4.78929 18.5391 4.41421 18.9142C4.03914 19.2893 3.53043 19.5 3 19.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Design
        </button>
        <button
          class={styles.project__control}
          classList={{ [styles.project__control_active]: active() === ETags.srategy }}
          onClick={() => handleClick(ETags.srategy)}
        >
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.41384 2.08602C9.60486 2.27051 9.75722 2.4912 9.86204 2.73521C9.96686 2.97922 10.022 3.24166 10.0243 3.50722C10.0266 3.77278 9.97604 4.03614 9.87548 4.28193C9.77492 4.52772 9.62641 4.75103 9.43863 4.93881C9.25084 5.1266 9.02754 5.2751 8.78175 5.37566C8.53595 5.47623 8.27259 5.52683 8.00704 5.52452C7.74148 5.52221 7.47904 5.46704 7.23503 5.36222C6.99102 5.25741 6.77033 5.10504 6.58584 4.91402C6.22152 4.53682 6.01993 4.03161 6.02449 3.50722C6.02905 2.98282 6.23938 2.4812 6.6102 2.11038C6.98102 1.73957 7.48264 1.52923 8.00704 1.52467C8.53143 1.52012 9.03663 1.7217 9.41384 2.08602" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.5H5C4.60218 5.5 4.22064 5.65804 3.93934 5.93934C3.65804 6.22064 3.5 6.60218 3.5 7C3.5 7.39782 3.65804 7.77936 3.93934 8.06066C4.22064 8.34196 4.60218 8.5 5 8.5H11C11.3978 8.5 11.7794 8.34196 12.0607 8.06066C12.342 7.77936 12.5 7.39782 12.5 7C12.5 6.60218 12.342 6.22064 12.0607 5.93934C11.7794 5.65804 11.3978 5.5 11 5.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 8.5L12 17.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 17.5L6 8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 20.5H2C1.73478 20.5 1.48043 20.3946 1.29289 20.2071C1.10536 20.0196 1 19.7652 1 19.5V19C1 18.6022 1.15804 18.2206 1.43934 17.9393C1.72064 17.658 2.10218 17.5 2.5 17.5H13.5C13.8978 17.5 14.2794 17.658 14.5607 17.9393C14.842 18.2206 15 18.6022 15 19V19.5C15 19.7652 14.8946 20.0196 14.7071 20.2071C14.5196 20.3946 14.2652 20.5 14 20.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          Strategy
        </button>
      </div>
      <div class={styles.project__projects}>
        <ul class={styles.project__list}>
          {sort().map(i => (
            <li class={styles.project__item}>
              {
                i.img ? (
                  <img class={styles.item__img} src={i.img} alt={i.title} />
                ) : (
                  <img class={styles.item__img} src="https://via.placeholder.com/150/000000/808080?text=NoImage" alt={i.title} />
                )

              }
              <div class={styles.item__header}>
                <a href={`/work/${i.slug}`} class={styles.item__link}>
                  <h3>{i.title}</h3>
                </a>
                <span class={`${styles.list__counts} ${styles.list__counts_devs}`}>{`${i.developers} developers`}</span>
                <span class={`${styles.list__counts} ${styles.list__counts_time}`}>{`${i.months} months`}</span>
              </div>
              <ul class={styles.item__tags}>
                {
                  i.tags.map(t => {
                    const cl = t === ETags.des ? styles.tag_des : t === ETags.dev ? styles.tag_dev : styles.tag_strat
                    return <li class={`${styles.tag} ${cl}`}>{t}</li>
                  })

                }
              </ul>
              <p class={styles.item__desc}>{i.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}