namespace ETHTPS.Data.Integrations.MSSQL.Extensions
{
    public static class ExperimentExtensions
    {
        private static Random Random = new();
        public static IEnumerable<Experiment> GetExperimentsForDeviceType(this EthtpsContext context, string deviceType)
        {
            lock (context.LockObj)
            {
                var targetTypes = context.ExperimentTargetTypes.Where(x => x.TargetTypeName == "Device" && (x.TargetTypeValue == deviceType || x.TargetTypeValue == "All"));
                if (targetTypes.Any())
                {
                    foreach (var targetType in targetTypes)
                    {
                        var target = context.ExperimentTargets.FirstOrDefault(x => x.Type == targetType.Id);
                        if (target != null)
                        {
                            foreach (var experiment in context.Experiments.Where(x => x.Target == target.Id).ToArray())
                            {
                                yield return experiment;
                            }
                        }
                    }
                }
            }
        }

        public static bool UserIsEligibleForEnrollmentIn(this EthtpsContext context, Experiment experiment, int apiKeyId)
        {
            if (context.UserIsEnrolledIn(experiment, apiKeyId))
                return false; //Already enrolled
            // We do want to keep some types of experiments alive indefinitely
            // Some of them should only be displayed once
            // Others only sometimes
            if (experiment.RunParametersNavigation.EnrollmentChance != null)
            {
                if (Random.Next(100) < experiment.RunParametersNavigation.EnrollmentChance)
                {
                    return true;
                }
            }
            return !context.UserIsEnrolledIn(experiment, apiKeyId);
        }

        public static bool UserIsEnrolledIn(this EthtpsContext context, Experiment experiment, int apiKeyId)
        {
            lock (context.LockObj)
            {
                //If there's a binding, the user has already been enrolled in the experiment
                return context.ApikeyExperimentBindings.Any(x => x.ExperimentId == experiment.Id && x.ApikeyId == apiKeyId);
            }
        }

        public static IEnumerable<Experiment> GetExperimentsUserIsEnrolledIn(this EthtpsContext context, int apiKeyId)
        {
            lock (context.LockObj)
            {
                if (context.ApikeyExperimentBindings.Any(x => x.ApikeyId == apiKeyId))
                {
                    return context.ApikeyExperimentBindings.Where(x => x.ApikeyId == apiKeyId).Select(x => x.Experiment).ToList();
                }
            }
            return Enumerable.Empty<Experiment>();
        }

        public static void EnrollUserIn(this EthtpsContext context, Experiment experiment, int apiKeyID)
        {
            if (!context.UserIsEligibleForEnrollmentIn(experiment, apiKeyID))
                throw new ApplicationException("Are you sure your logic is valid? You shouldn't be seeing this message.");

            lock (context.LockObj)
            {
                if (context.UserIsEnrolledIn(experiment, apiKeyID))
                    return; //Already enrolled

                context.ApikeyExperimentBindings.Add(new ApikeyExperimentBinding()
                {
                    ApikeyId = apiKeyID,
                    ExperimentId = experiment.Id,
                });
                context.SaveChanges();
            }
        }

        public static bool IsRunning(this Experiment experiment)
        {
            var parameters = experiment.RunParametersNavigation;
            if (!parameters.Enabled)
                return false;
            if (parameters.EndDate.HasValue)
            {
                if (DateTime.Now > parameters.EndDate.Value)
                    return false;
            }
            return true;
        }
    }
}
