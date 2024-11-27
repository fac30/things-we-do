import React from "react";

type IconProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  classes: string;
};

export default function Icon({ Icon, classes }: IconProps) {
  return <Icon className={classes} />;
}
