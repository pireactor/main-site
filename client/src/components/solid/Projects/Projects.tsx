import { createEffect, createSignal, onMount } from "solid-js";
import { ETags } from "../../../enums/ETags";
import styles from "./Projects.module.scss";


interface IProject {
  title: string;
  developers: number;
  months: number;
  tags: ETags[];
  desc: string;
  img: string;
  slug: string;
}
interface IProjectsProps {
  projects: IProject[];
  url?: any;
  servicesNames: Array<{name: ETags}>
  allBtnTitle: string;
  learnMoreText: string;
}


export function Projects(props: IProjectsProps) {
  const [sort, setSort] = createSignal(props.projects);
  const [active, setActive] = createSignal(ETags.all);
  const [path, setPath] = createSignal<ETags>()
  createEffect(() => {
    const url = decodeURI(window.location.search).replace("?", '') as ETags
    setPath(url);
    if(!path()) {
      setSort(props.projects);
      setActive(ETags.all);
    } else {
      setSort(props.projects.filter(i => i.tags.some((el) => el === path())))
      setActive(path())
    }
  })


  function handleClick(tag: ETags) {
    if (tag === ETags.all) {
      setSort(props.projects);
    } else {
      setSort(props.projects.filter(i => i.tags.some((el) => el === tag)))
    }
    setActive(tag)
  }
  return (
    <div class={styles.project}>
      <div class={styles.project__controlsWrp}>
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
          {props.allBtnTitle}
        </button>
        {props.servicesNames.map(i => (
          <button
            class={styles.project__control}
            classList={{ [styles.project__control_active]: active() === i.name }}
            onClick={() => handleClick(i.name)}
          >
            <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.99809 17.503C6.33496 17.503 5.69897 17.2397 5.22997 16.7708C4.76097 16.302 4.49736 15.6661 4.49709 15.003V12C4.49683 11.3369 4.23321 10.701 3.76421 10.2322C3.29521 9.76337 2.65923 9.50001 1.99609 9.50001C2.65923 9.49974 3.29511 9.23613 3.76392 8.76713C4.23273 8.29813 4.49609 7.66214 4.49609 6.99901V3.99801C4.49609 3.66949 4.56082 3.34419 4.68657 3.04069C4.81232 2.73719 4.99663 2.46143 5.22897 2.22918C5.46132 1.99693 5.73714 1.81273 6.0407 1.6871C6.34425 1.56147 6.66957 1.49688 6.99809 1.49701" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M17.002 1.49701C17.6651 1.49701 18.3011 1.76037 18.7701 2.22918C19.2391 2.69799 19.5027 3.33388 19.503 3.99701V7.00001C19.5032 7.66314 19.7668 8.29903 20.2358 8.76784C20.7048 9.23665 21.3408 9.50001 22.004 9.50001C21.3408 9.50027 20.7049 9.76389 20.2361 10.2329C19.7673 10.7019 19.504 11.3379 19.504 12.001V15.002C19.504 15.3305 19.4392 15.6558 19.3135 15.9593C19.1877 16.2628 19.0034 16.5386 18.7711 16.7708C18.5387 17.0031 18.2629 17.1873 17.9594 17.3129C17.6558 17.4385 17.3305 17.5031 17.002 17.503" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.0502 9.57301C12.0502 9.56644 12.0489 9.55994 12.0464 9.55388C12.0439 9.54781 12.0402 9.5423 12.0356 9.53765C12.0309 9.53301 12.0254 9.52933 12.0193 9.52682C12.0133 9.5243 12.0068 9.52301 12.0002 9.52301C11.9936 9.52301 11.9871 9.5243 11.9811 9.52682C11.975 9.52933 11.9695 9.53301 11.9648 9.53765C11.9602 9.5423 11.9565 9.54781 11.954 9.55388C11.9515 9.55994 11.9502 9.56644 11.9502 9.57301C11.9502 9.58627 11.9555 9.59899 11.9648 9.60837C11.9742 9.61774 11.9869 9.62301 12.0002 9.62301C12.0135 9.62301 12.0262 9.61774 12.0356 9.60837C12.0449 9.59899 12.0502 9.58627 12.0502 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.6 9.57301C8.6 9.56644 8.59871 9.55994 8.59619 9.55388C8.59368 9.54781 8.59 9.5423 8.58536 9.53765C8.58071 9.53301 8.5752 9.52933 8.56913 9.52682C8.56307 9.5243 8.55657 9.52301 8.55 9.52301C8.54343 9.52301 8.53693 9.5243 8.53087 9.52682C8.5248 9.52933 8.51929 9.53301 8.51464 9.53765C8.51 9.5423 8.50632 9.54781 8.50381 9.55388C8.50129 9.55994 8.5 9.56644 8.5 9.57301C8.5 9.58627 8.50527 9.59899 8.51464 9.60837C8.52402 9.61774 8.53674 9.62301 8.55 9.62301C8.56326 9.62301 8.57598 9.61774 8.58536 9.60837C8.59473 9.59899 8.6 9.58627 8.6 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.0512 9.57301C15.0512 9.55975 15.0459 9.54703 15.0365 9.53765C15.0271 9.52828 15.0144 9.52301 15.0012 9.52301C14.9879 9.52301 14.9752 9.52828 14.9658 9.53765C14.9564 9.54703 14.9512 9.55975 14.9512 9.57301C14.9512 9.58627 14.9564 9.59899 14.9658 9.60837C14.9752 9.61774 14.9879 9.62301 15.0012 9.62301C15.0144 9.62301 15.0271 9.61774 15.0365 9.60837C15.0459 9.59899 15.0512 9.58627 15.0512 9.57301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {i.name}
          </button>

        ))}
        </div>

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
                <div class={styles.list__countsWrp}>
                  <span class={`${styles.list__counts} ${styles.list__counts_devs}`}>{`${i.developers} developers`}</span>
                  <span class={`${styles.list__counts} ${styles.list__counts_time}`}>{`${i.months} months`}</span>
                </div>
              </div>
              <ul class={styles.item__tags}>
                {
                  i.tags.map(t => {
                    return <li class={styles.tag}>{t}</li>
                  })

                }
              </ul>
              <p class={styles.item__desc}>{i.desc}</p>
              <a class={styles.item__link_mob} href={`/work/${i.slug}`}>{props.learnMoreText}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}