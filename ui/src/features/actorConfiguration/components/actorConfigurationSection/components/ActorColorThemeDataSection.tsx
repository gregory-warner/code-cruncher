import {ActorDisplayItem} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useEffect, useState} from 'react';
import {Actor} from '../../../../../types';
import {TextField} from "@mui/material";
import {useUpdateActorMutation} from "../../../../../services/server/serverApi";

const ActorColorThemeDataSection = ({ actor }: {actor: Actor}) => {
    const [updatedActor, setUpdatedActor] = useState<Actor>(actor);

    useEffect(() => {
        setUpdatedActor(actor);
    }, [actor]);

    const [updateActor] = useUpdateActorMutation();

    const onSave = () => {
        updateActor({
            actorId: actor.actorId,
            ...updatedActor,
        });
    };

    const items: ActorDisplayItem[] = [
        {
            label: 'Name',
            value: updatedActor.colorTheme.messageCard.nameColor,
            editComponent: (
                <TextField
                    defaultValue={updatedActor.colorTheme.messageCard.nameColor}
                    onChange={(event) => setUpdatedActor({
                        ...updatedActor,
                        colorTheme: {
                            ...updatedActor.colorTheme,
                            messageCard: {
                                ...updatedActor.colorTheme.messageCard,
                                nameColor: event.target.value
                            }
                        }
                    })}
                />
            )
        },
        {
            label: 'Border',
            value: updatedActor.colorTheme.messageCard.borderColor,
            editComponent: (
                <TextField
                    defaultValue={updatedActor.colorTheme.messageCard.borderColor}
                    onChange={(event) => setUpdatedActor({
                        ...updatedActor,
                        colorTheme: {
                            ...updatedActor.colorTheme,
                            messageCard: {
                                ...updatedActor.colorTheme.messageCard,
                                borderColor: event.target.value
                            }
                        }
                    })}
                />
            )
        },
        {
            label: 'Contents',
            value: updatedActor.colorTheme.messageCard.contentsColor,
            editComponent: (
                <TextField
                    defaultValue={updatedActor.colorTheme.messageCard.contentsColor}
                    onChange={(event) => setUpdatedActor({
                        ...updatedActor,
                        colorTheme: {
                            ...updatedActor.colorTheme,
                            messageCard: {
                                ...updatedActor.colorTheme.messageCard,
                                contentsColor: event.target.value
                            }
                        }
                    })}
                />
            )
        },
    ];

    return (
        <ActorDataSection items={items} title='Color Theme' onSave={onSave} />
    );
};

export default ActorColorThemeDataSection;